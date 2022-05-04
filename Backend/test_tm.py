from pydantic import BaseModel
import unittest
from tm import get_tm_obj, process_input
from machine import TuringMachine

class Machine(BaseModel):
    machineID : str
    states : list
    halting : list
    alphabet : list
    transition_function : list


class TuringMachineTests(unittest.TestCase):

    def test_process_input_1(self):
        transition_function = ["s: ;h: ", "s:a;q:d", "q:d;s:>", "s:b;q:e", "q:e;s:>", "s:c;q:a", "q:a;s:>", "s:d;q:b", "q:b;s:>", "s:e;q:c", "q:c;s:>"] # cesar cipher test
        machine = TuringMachine("s,q,h","h","a,b,c,d,e",transition_function)
        input_string = "abcde"
        log = process_input(machine, input_string)
        assert log[-1] == ['6', 'h', [' ', 'd', 'e', 'a', 'b', 'c', ' ']]
    

    def test_process_input_2(self):
        transition_function = ["s:a;o:>", "s:*;ee:>", "o:a;e:>", "o:*;oe:>", "e:a;o:>", "e:*;ee:>", "ee:a;eo:>", "ee: ;y: ", "oe:a;oo:>", "oe: ;n: ", "oo:a;oe:>", "oo: ;y: ", "eo:a;ee:>", "eo: ;n: "]
        machine = TuringMachine(["s","o","e","ee","oe","oo","eo","y","n"],["y", "n"],"a,*",transition_function)
        
        input_string_n = "aaa*aaaa"
        log = process_input(machine, input_string_n)
        assert log[-1][1] == 'n'

        input_string_y = 'aaaaa*aaaaa'
        log = process_input(machine, input_string_y)
        assert log[-1][1] == 'y'

    
    def test_process_input_no_halt(self):
        transition_function = ["s:*;s:>"]
        machine = TuringMachine("s,q,h","h","a,b,c,d,e",transition_function)
        log = process_input(machine, "aaa")
        assert len(log) == 101

    
    def test_create_obj(self):
        machine = Machine(machineID='id',states=["a","b"],halting=["b"],alphabet=["a","b"],transition_function=[])
        machine_obj = get_tm_obj(machine)
        assert isinstance(machine_obj, TuringMachine)