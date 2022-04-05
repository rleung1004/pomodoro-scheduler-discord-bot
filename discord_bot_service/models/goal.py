import discord
import os
import requests
import endpoints
import pandas as pd


from credentials import get_discord_bot_credentials, get_auth_token_header
from webserver import app

client = discord.Client()
API_URL = os.environ.get('API_URL')


class Goal:
  @staticmethod
  async def get_goal_template(message, file_name):
      goal = [{
          "id": "Leave this blank",
          "name": "name of the goal",
          "location": "location of goal",
          "notes": "notes related to goal",
          "totalTime": 100,
          "timeLeft": 100,
          "priority": 0,
          "endDate": "2022-12-31 23:59:00",
          "minTaskTime": 15,
          "ignoreDeadline": "TRUE"
      }]
      df = pd.DataFrame(goal, index=[0]).reset_index()
      df.to_excel(file_name, index=False)
      await message.channel.send("Please fill out the goal template to add a goal using !addGoal", file=discord.File(file_name))
      if os.path.exists(file_name):
          os.remove(file_name)
    
  @staticmethod
  async def get_goals(message):
      file_name = f"found_goals_{message.author.name}_{message.author.discriminator}.xlsx"
      user_id = f"{message.author.name}%23{message.author.discriminator}"
      response = requests.get(
          API_URL + "goal/" + user_id,
          headers=get_auth_token_header()
      )
      if response.status_code == 200:
        df = pd.DataFrame(response.json()['goals'])
        df.to_excel(file_name)
        await message.channel.send("Please download the excel file containing your goals.", file=discord.File(file_name))
        
      if response.status_code == 404:
        await message.channel.send(response.json()["message"])
        
      if response.status_code == 401:
        res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
        app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
        await Goal.get_goals(message)
        if os.path.exists(file_name):
          os.remove(file_name)
        return 

  @staticmethod
  async def create_goal(message, file_name):
      print("CREATE GOALS")
      user_id = f"{message.author.name}%23{message.author.discriminator}"
      df = pd.read_excel(file_name)
      xlsx = df.to_dict()
      for i in range(len(df)):
        goal = {
            "name": xlsx["name"][i],
            "location": xlsx["location"][i],
            "notes": xlsx["notes"][i],
            "totalTime": int(xlsx["totalTime"][i]),
            "timeLeft": int(xlsx["timeLeft"][i]),
            "priority": int(xlsx["priority"][i]),
            "endDate": xlsx["endDate"][i],
            "minTaskTime": int(xlsx["minTaskTime"][i]),
            "ignoreDeadline": "true" if xlsx["ignoreDeadline"][i] else "false",
        }
        res = requests.put(API_URL + "goal/" + user_id, headers=get_auth_token_header(), data=goal)

        if res.status_code == 401:
          res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
          app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
          return await Goal.create_goal(message, file_name)
        
        if res.status_code == 422:
          await message.channel.send(res.json()["errors"])
        else:
          await message.channel.send(res.json()["message"])
      if os.path.exists(file_name):
          os.remove(file_name)

  async def update_goals(message, file_name):
    print("UPDATE GOAL")
    user_id = f"{message.author.name}%23{message.author.discriminator}"
    df = pd.read_excel(file_name)
    xlsx = df.to_dict()
    for i in range(len(df)):
      goal_id = xlsx['id'][i]
      goal = {
          "name": xlsx["name"][i],
            "location": xlsx["location"][i],
            "notes": xlsx["notes"][i],
            "totalTime": int(xlsx["totalTime"][i]),
            "timeLeft": int(xlsx["timeLeft"][i]),
            "priority": int(xlsx["priority"][i]),
            "endDate": xlsx["endDate"][i],
            "minTaskTime": int(xlsx["minTaskTime"][i]),
            "ignoreDeadline": "true" if xlsx["ignoreDeadline"][i] else "false",
      }
      res = requests.patch(API_URL + f"goal/{user_id}/{goal_id}", data=goal, headers=get_auth_token_header())
      print(res.status_code)
      if res.status_code == 422:
          await message.channel.send(res.json()["error"])
      elif res.status_code == 401:
        res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
        app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
        return await Goal.update_goals(message, file_name)
      else:
          await message.channel.send(res.json()["message"])
    if os.path.exists(file_name):
          os.remove(file_name)

  async def delete_goals(message, file_name):
    user_id = f"{message.author.name}%23{message.author.discriminator}"
    df = pd.read_excel(file_name)
    xlsx = df.to_dict()
    for i in range(len(df)):
      goal_id = xlsx['id'][i]
      res = requests.delete(API_URL + f"goal/{user_id}/{goal_id}")
      if res.status_code == 422:
          await message.channel.send(res.json()["error"])
      elif res.status_code == 401:
        res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
        app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
        return await Goal.delete_goals(message, file_name)
      else:
          await message.channel.send(res.json()["message"])
    if os.path.exists(file_name):
          os.remove(file_name)
