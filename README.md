# Automate.io-Assignment
Testing Interactive Custom Command Line 
---------------------------------------------------

Steps to Test:
---------------

1. Install Node Js
2. Download the files into Local Repository
3. Set node path to the current Working Dorectory in command Line and run "npm install" command
4. Commands:
   --------------
   1. npm test defn <word> : Display Definations of the word
   2. npm test syn <word> : Display Synonyms if any
   3. npm test ant <word> : Display Antonyms if any
   4. npm test ex <word> : Display Examples of the word 
   5. npm test <word> : Display all definitions, synonyms, antonyms and examples of the word
   6. npm test : Display all definitions, synonyms, antonyms and examples of any random word
   7. npm test play : Display definition and synonym of the word and ask user to enter the correct word.
      - Three Choices: 
          1. Try Again
          2. Hint: 
                  a. Shuffle the characters of the word
                  b. Display new synonym if any
                  c. Display New Antonym if any
                  d. Display New Definition if any
          3. Quit
