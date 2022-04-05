import os
import discord
import json
import requests
from webserver import keep_alive
import endpoints
from models import goal
from models import commitment
from models import schedule
from models import user_config
import pandas as pd
from authentication import authorize
# import schedule


# add to env variables
API_URL = os.environ.get('API_URL')
 

async def help(channel):
    await channel.send(
        """  
        TEMPLATES:
        Get user config excel template: !getUserConfigTemplate
        Get goal excel template: !getGoalTemplate
        Get commitment excel template: !getCommitmentTemplate
  
        USER_CONFIG:
        To setup your user config: !setUserConfig
  
        ADDING ENTRIES TO SCHEDULE:
        To add commitments: !addCommitments [attach .xlsx file]
        To add goals: !addGoals [attach .xlsx file]

        GET SCEHDULE ENTRIES:
        To get commitments: !getCommitments
        To get goals: !getGoals
        
        UPDATE SCHEDULE ENTRIES:
        To update commitments: !updateCommitments [attach .xlsx file]
        To update goals: !updateGoals [attach .xlsx file]
  
        DELETE ENTRIES FROM SCHEDULE:
        To delete commitments: !deleteCommitments [attach .xlsx file]
        To delete goals: !deleteGoals [attach .xlsx file]
  
        INTERACT WITH SCHEDULE:
        To get current schedule excel: !getSchedule 
        To update current schedule: !updateSchedule [attach .xlsx file]
  
        GET THE TUTORIAL:
        To get set up steps: !tutorial
        """
    )


async def tutorial(channel):
    await channel.send(
        """
        **Set Up Your Configuration File**
            1. Create Your User Config
            Command: !getUserConfigTemplate
            Action: Fill out the given config spreadsheet in the following format:
                    index: Do not change this.
                     start: start time of the schedule days in minutes (0-1439).
                        ex: start = 480 = 08:00
                     end: end time of the schedule days in minutes (0-1439).
                        ex: end: 1200 = 20:00
                   
            2. Set Your New User Config
            Command: !setUserConfig
            Action:  Attach your user config spreadsheet to the message with the command.
            """
    )
    await channel.send(
        """
        **Commitments**
            1. Create your commitments
            Command: !getCommitmentTemplate
            Action: Fill out the given commitment spreadsheet in the following format:
                    index: Do not change this.
                    id: Have this field be empty.
                    name: Name of your commitment. 
                    location: Can be empty.
                    notes: Can be empty.
                    url: Can be empty.
                    minutes: Length of commitment in minutes.
                        ex: 120 = 2 Hours
                    repeats: Comma seperated days to repeat on.
                             Empty if commitment never repeats.
                        format: MON,TUES,WED,THURS,FRI,SAT,SUN
                        ex: MON,TUES
                    startTime: Time and Initial Date of Commitment.
                        format: 'Y-M-D HH:MM:SS' (single quotes necessary)
                        ex: '2022-04-05 08:30:00'
                    endDate: Only schedule the commitment up to this date inclusive.
                        format: 'Y-M-D HH:MM:SS' (single quotes necessary)
                        ex: '2022-04-05 08:30:00' 
                        
            2. Add your commitments 
            Command: !addCommitments
            Action: Attach your commitments spreadsheet to the message with the command.
              
            3. Get your commitments
            Command: !getCommitments
            Action: None
            
            4. Delete your commitments
            Command: !deleteCommitments
            Action: Attach the commitment spreadsheet you wish to delete, found from the !getCommitments command
            """
    )
    await channel.send(
        """    
        **Goals**
            1. Create your goals
            Command: !getGoalTemplate
            Action: Fill out the given goal spreadsheet in the following format:
                    index: Do not change this.
                    id: Have this field be empty.
                    name: Name of your commitment. 
                    location: Can be empty.
                    notes: Can be empty.
                    totalTime: Total time the goal will take in minutes.
                      ex.   120 = 2 Hours
                    timeLeft: Time left to complete the goal in minutes.
                      (must be the same as totalTime)
                    priority: The goal's priority from 0 - 10 (0 being highest)
                    endDate: Only schedule the goal up to this date inclusive.
                        format: 'Y-M-D HH:MM:SS' (single quotes necessary)
                        ex: '2022-04-05 08:30:00'
                    minTaskTime: The minimum task time for a single session in minutes.
                      (must be less than totalTime)
                    ignoreDeadline: Schedule this even if end date is passed.
                      ex. 0 for False, 1 for True

            2. Add your goals
            Command: !addGoals 
            Action: Attach the goal spreadsheet you created from the !getGoalTemplate command
            
            3. Get your goals
            Command: !getGoals
            Action: None
            
            4. Delete your goals
            Command: !deleteGoals
            Action: Attach the goal spreadsheet you wish to delete, found from the !getGoals command
            """
    )
    await channel.send(
        """
        **Schedule**
            1. Get your schedule
            Command: !getSchedule
            Action: To get your schedule you need to have:
                - a config with !setUserConfig
                - atleast one commitment with !addCommitment
                - atleast one goal with !addGoal
                
            2. Update your Schedule
            Command: !updateSchedule 
            Action: In the given excel file from the !getSchedule command, change all completed tasks from
                N to Y in the "Completed" column.
                Then, attach the updated schedule spreadsheet with the !updateSchedule command.
            """
    )
  
# bot stuff starts here:
client = discord.Client()


@client.event
async def on_ready():
    print("client logged in as {0.user}".format(client))


@client.event
async def on_message(message):
    channel = message.channel
  
    def check(m):
        return m.author == message.author and m.channel == channel
      
    if message.author == client.user:
        return
      
    if message.content.startswith("!getSchedule"):
        file_name = f"found_schedule_{message.author.name}_{message.author.discriminator}.xlsx"
        await schedule.Schedule.get_schedule(message, file_name)

    if message.content.startswith("!updateSchedule"):
        schedule_attachment = message.attachments
        file_name = f"update_schedule_{message.author.name}_{message.author.discriminator}.xlsx"
        await schedule_attachment[0].save(file_name)
        await schedule.Schedule.update_schedule(message, file_name)
      
    if message.content.startswith("!getUserConfigTemplate"):
      file_name = f"user_config_{message.author.name}_{message.author.discriminator}.xlsx"
      await user_config.UserConfig.get_default_user_config(message, file_name)

    if message.content.startswith("!setUserConfig"):
        user_config_attachment = message.attachments
        file_name = f"user_config_{message.author.name}_{message.author.discriminator}.xlsx"
        await user_config_attachment[0].save(file_name)
        await user_config.UserConfig.create_user_config(message, file_name)

    if message.content.startswith("!getCommitmentTemplate"):
      file_name = f"commitment_{message.author.name}_{message.author.discriminator}.xlsx"
      await commitment.Commitment.get_commitment_template(message, file_name)
        
    if message.content.startswith("!addCommitments"):
        commitment_attachment = message.attachments
        file_name = commitment_attachment[0].filename
        await commitment_attachment[0].save(file_name)
        await commitment.Commitment.post_commitment(message, file_name)

    if message.content.startswith("!getCommitments"):
        await commitment.Commitment.get_commitments(message)

    if message.content.startswith("!updateCommitments"):
        commitment_attachment = message.attachments
        file_name = f"update_commitments_{message.author.name}_{message.author.discriminator}.xlsx"
        await commitment_attachment[0].save(file_name)
        await commitment.Commitment.update_commitments(message, file_name)
      
    if message.content.startswith("!deleteCommitments"):
        commitment_attachment = message.attachments
        file_name = f"delete_commitments_{message.author.name}_{message.author.discriminator}.xlsx"
        await commitment_attachment[0].save(file_name)
        await commitment.Commitment.delete_commitments(message, file_name)

    if message.content.startswith("!getGoalTemplate"):
        file_name = f"goal_{message.author.name}_{message.author.discriminator}.xlsx"
        await goal.Goal.get_goal_template(message, file_name)

    if message.content.startswith("!addGoals"):
        goal_attachment = message.attachments
        file_name = goal_attachment[0].filename
        await goal_attachment[0].save(file_name)
        await goal.Goal.create_goal(message, file_name)

    if message.content.startswith("!getGoals"):
          await goal.Goal.get_goals(message)
      
    if message.content.startswith("!updateGoals"):
        goal_attachment = message.attachments
        file_name = f"update_goals_{message.author.name}_{message.author.discriminator}.xlsx"
        await goal_attachment[0].save(file_name)
        await goal.Goal.update_goals(message, file_name)

    if message.content.startswith("!deleteGoals"):
        goal_attachment = message.attachments
        file_name = f"delete_goals_{message.author.name}_{message.author.discriminator}.xlsx"
        await goal_attachment[0].save(file_name)
        await goal.Goal.delete_goals(message, file_name)

    if message.content.startswith("!help"):
        await help(channel)

    if message.content.startswith("!tutorial"):
        await tutorial(channel)
      
#### CLIENT RUN ####
keep_alive()

TOKEN = os.environ.get("DISCORD_BOT_SECRET")

client.run(TOKEN)
#### CLIENT RUN ####
