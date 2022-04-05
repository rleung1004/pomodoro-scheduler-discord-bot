from datetime import datetime

import os
import requests
import pandas as pd
import endpoints
import discord
from credentials import get_discord_bot_credentials, get_auth_token_header
from webserver import app


class UserConfig:
    @staticmethod
    async def get_default_user_config(message, file_name):
      channel = message.channel
      user_config = [{
        "start": 480,
        "end": 960
      }]
      df = pd.DataFrame(user_config, index=[0]).reset_index()
      df.to_excel(file_name, index=False)
      await channel.send(f"Please enter your config values in this xlsx and send it back", file=discord.File(file_name))
      if os.path.exists(file_name):
          os.remove(file_name)

    @staticmethod
    async def create_user_config(message, file_name):
      channel = message.channel
      user_id = f"{message.author.name}%23{message.author.discriminator}"
      df = pd.read_excel(file_name)
      xlsx = df.to_dict()
      body = {
        'start': str(xlsx["start"][0]),
        'end': str(xlsx["end"][0])
      }
      res = requests.put(f"{endpoints.API_URL}userConfig/{user_id}",  headers=get_auth_token_header(), data=body)
      
      if res.status_code == 401:
        res = requests.post(endpoints.sign_in_endpoint(), data=get_discord_bot_credentials())
        app.config["ACCESS_TOKEN"] = res.json()["accessToken"]
        return await UserConfig.create_user_config(message, file_name)
        
      await channel.send(res.json()["message"])
      if os.path.exists(file_name):
          os.remove(file_name)
      return 
      