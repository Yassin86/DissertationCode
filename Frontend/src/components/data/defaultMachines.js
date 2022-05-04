export const machineData = [
    {
        "machineID" : "Caeser Cipher", 
        "states" : ["s","q","h"],
        "halting" : ["h"],
        "alphabet" : ["a","b","c","d","e"],
        "transition_function" : ["s: ;h: ", "s:a;q:d", "q:*;s:>", "s:b;q:e", "s:c;q:a", "s:d;q:b", "s:e;q:c"]
    },
    {
        "machineID" : "Parity Check",
        "states" : ["s","o","e","ee","oe","oo","eo","y","n"],
        "halting" : ["y", "n"],
        "alphabet" : ["a", "*"],
        "transition_function" : ["s:a;o:>", "s:*;ee:>", "o:a;e:>", "o:*;oe:>", "e:a;o:>", "e:*;ee:>", "ee:a;eo:>", "ee: ;y: ", "oe:a;oo:>", "oe: ;n: ", "oo:a;oe:>", "oo: ;y: ", "eo:a;ee:>", "eo: ;n: "]
    },
    {
        "machineID" : "Binary Increment",
        "states" : ["r","c","c1","d"],
        "halting" : ["d"],
        "alphabet" : ["1", "0"],
        "transition_function" : ["r:1;r:>", "r:0;r:>", "r: ;c:<", "c:1;c1:0", "c1:0;c:<", "c:0;c1:1", "c1:1;d:1", "c: ;c1:1", "c1: ;d: "]
    }
]