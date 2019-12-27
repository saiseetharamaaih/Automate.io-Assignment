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
   a. npm test defn <word> : Display Definations of the word
   b. npm test syn <word> : Display Synonyms if any
   c. npm test ant <word> : Display Antonyms if any
   d. npm test ex <word> : Display Examples of the word 
   e. npm test <word> : Display all definitions, synonyms, antonyms and examples of the word
   f. npm test : Display all definitions, synonyms, antonyms and examples of any random word
   g. npm test play : Display definition and synonym of the word and ask user to enter the correct word.
      - Three Choices: 
          1. Try Again
          2. Hint: 
                  a. Shuffle the characters of the word
                  b. Display new synonym if any
                  c. Display New Antonym if any
                  d. Display New Definition if any
          3. Quit
