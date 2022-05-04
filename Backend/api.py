from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tm import process_input, get_tm_obj

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Machine(BaseModel):
    machineID : str
    states : list
    halting : list
    alphabet : list
    transition_function : list


class Input(BaseModel):
    machine : Machine
    input_string : str


@app.get("/")
def root():
    return {"TuringMachineApp":"Home"}


@app.post('/log')
def process_input_string(input : Input):
    machine_json = Machine.parse_obj(input.machine) if isinstance(input.machine, dict) else input.machine
    input_string = input.input_string
    machine_obj = get_tm_obj(machine_json)
    return process_input(machine_obj, input_string)
