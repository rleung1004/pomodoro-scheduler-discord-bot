import requests
import endpoints
import discord
import pandas as pd
import os
import json

from credentials import get_discord_bot_credentials, get_auth_token_header
from webserver import app

API_URL = os.environ.get('API_URL')

class Commitment:
    @staticmethod
    async def get_commitment_template(message, file_name):
        commitment = [{
            "id": "Leave this blank",
            "name": "name of the commitment",
            "location": "location of commitment",
            "notes": "notes related to commitment",
            "minutes": 100,
            "repeats": "MON,TUES,WED,THURS,FRI,SAT,SUN",
            "url": "www.url.com",
            "startTime": "2022-01-01 00:00:00",
            "endDate": "2022-12-31 23:59:00"
        }]
        
        df = pd.DataFrame(commitment, index=[0], dtype=object).reset_index()
        df.to_excel(file_name, index=False)
        await message.channel.send("Please fill out the commitment template to add a commitment using !addCommitment", file=discord.File(file_name))
        if os.path.exists(file_name):
            os.remove(file_name)
      

    @staticmethod
    async def get_commitments(message):
        print("GET COMMITMENTS")
  
        user_id = f"{message.author.name}%23{message.author.discriminator}"

        response = requests.get(
            API_URL + "commitment/" + user_id,
            headers=get_auth_token_header()
        )

        file_name = f"found_commitments_{message.author.name}_{message.author.discriminator}.xlsx"
        print(response.status_code)
        if response.status_code == 401:
            res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
            app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
            return await Commitment.get_commitments(message)
      
        if response.status_code == 200:
          df = pd.DataFrame(response.json()['commitments'])
          df.to_excel(file_name)
          await message.channel.send("Please download the excel file containing your commitments.", file=discord.File(file_name))
          if os.path.exists(file_name):
            os.remove(file_name)
            
        if response.status_code == 404:
          await message.channel.send(response.json()["message"])
            

    @staticmethod
    async def post_commitment(message, file_name):
        user_id = f"{message.author.name}%23{message.author.discriminator}"
        df = pd.read_excel(file_name)
        xlsx = df.to_dict()
        for i in range(len(df)):
          print(xlsx["repeats"][i], type(xlsx["repeats"][i]))
          commitment = {
            "name": xlsx["name"][i],
              "location": xlsx["location"][i],
              "notes": xlsx["notes"][i],
              "minutes": xlsx["minutes"][i],
              "repeats": xlsx["repeats"][i].split(","),
              "url": xlsx["url"][i],
              "startTime": xlsx["startTime"][i],
              "endDate": xlsx["endDate"][i]
          }
          res = requests.put(
            API_URL + "commitment/" + user_id, 
            data=commitment,
            headers=get_auth_token_header()
          )
          
          if res.status_code == 401:
            res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
            app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
            return await Commitment.post_commitment(message, file_name)
          
          if res.status_code == 422:
            await message.channel.send(res.json()["errors"])
          else:
            await message.channel.send(res.json()["message"])
        if os.path.exists(file_name):
            os.remove(file_name)

    async def update_commitments(message, file_name):
      print("UPDATE COMMITMETNS")
      user_id = f"{message.author.name}%23{message.author.discriminator}"
      df = pd.read_excel(file_name)
      xlsx = df.to_dict()
      for i in range(len(df)):
        commitment_id = xlsx['id'][i]
        commitment = {
            "name": xlsx["name"][i],
              "location": xlsx["location"][i],
              "notes": xlsx["notes"][i],
              "minutes": xlsx["minutes"][i],
              "repeats": list(xlsx["repeats"][i].split(",")),
              "url": xlsx["url"][i],
              "startTime": xlsx["startTime"][i],
              "endDate": xlsx["endDate"][i]
        }
        res = requests.patch(API_URL + f"commitment/{user_id}/{commitment_id}", data=commitment, headers=get_auth_token_header())
        print(res.status_code)

        if res.status_code == 401:
            res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
            app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
            return await Commitment.update_commitments(message, file_name)
        
        if res.status_code == 422:
            await message.channel.send(res.json()["errors"])
        else:
            await message.channel.send(res.json()["message"])
        
      if os.path.exists(file_name):
            os.remove(file_name)
  
    # needs a get_commitment request to get commitment_id
    async def delete_commitments(message, file_name):
      user_id = f"{message.author.name}%23{message.author.discriminator}"
      df = pd.read_excel(file_name)
      xlsx = df.to_dict()
      for i in range(len(df)):
        commitment_id = xlsx['id'][i]
        res = requests.delete(
          API_URL + f"commitment/{user_id}/{commitment_id}",
          headers=get_auth_token_header()
        )

        if res.status_code == 401:
            res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
            app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
            return await Commitment.delete_commitments(message, file_name)
          
        if res.status_code == 422:
            await message.channel.send(res.json()["errors"])
        else:
            await message.channel.send(res.json()["message"])

      if os.path.exists(file_name):
            os.remove(file_name)
  