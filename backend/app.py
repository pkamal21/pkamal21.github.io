from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Team(BaseModel):
    gk1: str
    df1: str
    df2: str
    fw1: str
    fw2: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/teams", response_model=List[Team])
async def get_teams():
    teams = [
        Team(gk1="GK1_1", df1="DF1_1", df2="DF2_1", fw1="FW1_1", fw2="FW2_1"),
        Team(gk1="GK1_2", df1="DF1_2", df2="DF2_2", fw1="FW1_2", fw2="FW2_2"),
    ]
    return teams

