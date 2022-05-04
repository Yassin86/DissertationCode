
class TuringMachine:

    def __init__(self,states,halt,alphabet,transition_func):
        self.states = states.split(',') if isinstance(states,str) else states
        self.halt = halt.split(',') if isinstance(halt,str) else halt # can be more than 1 halting state
        self.alphabet = alphabet.split(',') if isinstance(alphabet,str) else alphabet
        self.tf = self.convert_func(transition_func) # input format = "state,input;state2,word2"
        
    
    def convert_func(self,trans):
        # list of strings to dictionary with tuple keys
        # { (s, a) : (q, b), }
        
        trans_func = {}
        
        for string in trans:
            split = string.split(';')
            key = tuple(split[0].split(':'))
            value = tuple(split[1].split(':'))
            trans_func[key] = value

        return trans_func


    def get_starting(self):
        return self.states[0] # starting state should be the first of the list of states