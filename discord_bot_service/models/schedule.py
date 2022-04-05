import os
from datetime import datetime

import pandas as pd
import discord
import requests

import endpoints

from credentials import get_discord_bot_credentials, get_auth_token_header
from webserver import app


class Schedule:
    @staticmethod
    async def get_schedule(message: discord.Message, file_name: str):
        user_id = message.author.name + "%23" + message.author.discriminator
        res = requests.get(endpoints.get_schedule_endpoint(user_id), headers=get_auth_token_header())
        if res.status_code == 401:
          res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
          app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
          return await Schedule.get_schedule(message, file_name)

        if 'schedule' not in res.json():
            await message.channel.send(f"Your schedule has not been created yet\n"
                                       f"Make sure you have the following created:\n"
                                       f"\t1.Goals\n\t2.Commitments\n\t3.User Config")
            return
          
        schedule = []
        for s in res.json()['schedule']:
            schedule.append(
                {
                    'Timestamp': datetime.strptime(s['date'].strip("\"'(),") + f" {s['time']}", "%Y-%m-%d %H:%M:%S"),
                    'Task Name': s['name'] if "break" not in s[
                        'name'] else f"Break {s['name'][s['name'].rfind('_') + 1: len(s['name'])]} Minutes",
                    'Minutes': s['minutes'],
                    'Priority': s['priority'] if s['priority'] != -1 else "N/A",
                    'Task ID': s['taskID'],
                    'Completed': "N" if s['isGoal'] else "N/A"
                }
            )

        schedule.sort(key=lambda x: x['Timestamp'])
        df = pd.DataFrame(columns=list(schedule[0].keys()))
        for s in schedule:
            df = df.append(s, ignore_index=True)
        df.to_excel(file_name, index=False)
        await message.channel.send(f"Here's your schedule!\n"
                                   f"When you are done with a task, change the 'Completed' field to 'Y'\n"
                                   f"And when you want to update your schedule, attach the excel and use !updateSchedule",
                                   file=discord.File(file_name))
        if os.path.exists(file_name):
            os.remove(file_name)

    @staticmethod
    async def update_schedule(message: discord.Message, file_name: str):
        user_id = message.author.name + "%23" + message.author.discriminator
        res = requests.get(endpoints.get_goals_endpoint(user_id), headers=get_auth_token_header())
        if res.status_code == 401:
          res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
          app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
          return await Schedule.update_schedule(message, file_name)
        goals = res.json()['goals']

        sched_df = pd.read_excel(file_name)
        sched_df['Completed'] = [str(v).strip().lower() for v in sched_df['Completed'].values]

        for index, row in sched_df.loc[sched_df['Completed'] == 'y'].iterrows():
            goal_index = next((i for i, g in enumerate(goals) if g['id'] == row['Task ID']), -1)
            if goal_index > -1:
                goals[goal_index]['timeLeft'] -= row['Minutes']

        for goal in goals:
            data = {
                "location": goal['location'],
                "name": goal['name'],
                "notes": goal['notes'],
                "totalTime": goal['totalTime'],
                "timeLeft": goal['timeLeft'],
                "priority": goal['priority'],
                "endDate": goal['endDate'],
                "minTaskTime": goal['minTaskTime'],
                "ignoreDeadline": goal['ignoreDeadline']
            }
            res = requests.patch(endpoints.patch_goal_endpoint(user_id=user_id, goal_id=goal['id']), headers=get_auth_token_header(), 
                                 data=data)

        if os.path.exists(file_name):
            os.remove(file_name)

        await Schedule.get_schedule(message, file_name)

