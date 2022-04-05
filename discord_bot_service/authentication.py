import requests
import endpoints
import os

class AuthException(Exception):
  pass

async def authorize(func):
    async def auth_wrapper(*args, **kwargs):
      try:
        return await func(*args, **kwargs)
      except AuthException:
        data = {
          "username": os.environ.get('DISCORD_BOT_USERNAME'),
          "password": os.environ.get('DISCORD_BOT_PASSWORD')
        }
        res = requests.post(endpoints.sign_in_endpoint(), data=data)
        print(res)
    return auth_wrapper