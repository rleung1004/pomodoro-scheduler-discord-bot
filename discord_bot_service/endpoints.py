import os

API_URL = os.environ.get('API_URL')
SCHEDUlER_ENPOINT = os.environ.get('SCHEDUlER_ENPOINT')

#### SIGN IN ####
def sign_in_endpoint():
  return API_URL + "users/signin"

#### COMMITMENTS ####
def get_commitments_endpoint(user_id: str):
  return API_URL + f"commitment/{user_id}"

def put_commitment_endpoint(user_id: str):
  return API_URL + f"commitment/{user_id}"

def patch_commitment_endpoint(user_id: str, commitment_id: str):
  return API_URL + f"commitment/{user_id}/{commitment_id}"

def delete_commitment_endpoint(user_id: str, commitment_id: str):
  return API_URL + f"commitment/{user_id}/{commitment_id}"
#### COMMITMENTS ####

#### GOALS ####
def get_goals_endpoint(user_id: str):
  return API_URL + f"goal/{user_id}"

def put_goal_endpoint(user_id: str):
  return API_URL + f"goal/{user_id}"

def patch_goal_endpoint(user_id: str, goal_id: str):
  return API_URL + f"goal/{user_id}/{goal_id}"

def delete_goal_endpoint(user_id: str, goal_id: str):
  return API_URL + f"goal/{user_id}/{goal_id}"
#### GOALS ####

#### SCHEDULE ####
def get_schedule_endpoint(user_id: str):
  return API_URL + f"schedule/{user_id}"

def update_schedule_endpoint(user_id: str):
  return SCHEDUlER_ENPOINT + f"schedule/update"
#### SCHEDUlE ####

#### USER CONFIG ####
def put_user_config_endpoint(user_id: str):
  return API_URL + f"userConfig/{user_id}"

def patch_user_config_endpoint(user_id: str, day_of_week: int):
  return API_URL + f"userConfig/{user_id}/{day_of_week}"