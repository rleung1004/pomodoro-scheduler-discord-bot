import os
from webserver import app

def get_discord_bot_credentials():
  return {
          "username": os.environ.get('DISCORD_BOT_USERNAME'),
          "password": os.environ.get('DISCORD_BOT_PASSWORD')
  }

def get_auth_token_header():
  return {
    "Authorization": f"Bearer {app.config.get('ACCESS_TOKEN')}"
  }