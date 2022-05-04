from machine import TuringMachine


def process_input(tm, input_string):

    if all([x in tm.alphabet for x in input_string]): 

        log = []

        tape = [' '] * (len(input_string) + 2)
        for i in range(1,len(input_string) + 1):
            tape[i] = input_string[i-1]

        state = tm.get_starting()
        tape_position = 1

        counter = 0
        while state not in tm.halt and counter < 100: 
            counter += 1
            log.append([str(tape_position),state,tape.copy()])

            next = tm.tf.get(tuple([state,tape[tape_position]]))

            if not next:
                next = tm.tf.get(tuple([state,'*'])) # wildcard
                if not next:
                    return "Transition function error -> check ( %s : %s )" % (state, tape[tape_position])
            
            state, letter = next
            
            if letter == '<':
                tape_position -= 1
                if tape_position < 0:
                    list([' '] * 10).extend(tape)
                    tape_position = 9
            elif letter == '>':
                tape_position += 1
                if tape_position >= len(tape):
                    tape.extend([' '] * 10) # 'infinite' tape
            else:
                tape[tape_position] = letter

        log.append([str(tape_position),state,tape.copy()]) # inc halting state
        
        return log


def get_tm_obj(machine):
    return TuringMachine(machine.states, machine.halting, machine.alphabet, machine.transition_function)