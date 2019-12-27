const https = require('https');
const request = require('request');
var inquirer = require('inquirer');
const chalk = require('chalk');
Key = "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164"
Host = "https://fourtytwowords.herokuapp.com";
API = "";


String.prototype.shuffle = function(){
    return this.split('').sort(function(a,b){
      return (7 - (Math.random()+'')[5]);
    }).join('');
  };

var s=0,a=0,d=0;
var syns = [];
var ants = [];
var defs = [];
var exmpls = [];
var word = "";


const callExternalApiUsingHttp = (callback) => {
    request(API, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

var d = "";
function calldefn(data){
    API = Host+"/word/"+data+"/definitions?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        console.log(chalk.green("Definitions: \n-----------------------------------------------"));
        for(var el in data){
            console.log(chalk.green(data[el].text));
        }
        console.log();
    });
};

function callrandom(){
    API = Host+"/words/randomWord?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        word = data.word;
        console.log(chalk.yellow("Word Of The Day: "+word+" \n-----------------------------------------------"));
        calldefn(word);
        callexamples(word);
        callrelated(word,0);
        callrelated(word,1);
    });
};



function callexamples(data){
    API = Host+"/word/"+data+"/examples?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        console.log(chalk.green("Examples: \n-----------------------------------------------"));
        for(var el in data.examples){
            console.log(chalk.green(data.examples[el].text));
            
        }
        console.log();
    });
};

function callrelated(data,type){ 
    
    API = Host+"/word/"+data+"/relatedWords?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        for(var el in data){
           if(data[el].relationshipType === 'synonym' && type == 0){
                //syns = data[el].words;
                console.log(chalk.green("Synonyms: \n-----------------------------------------------"));
                console.log(chalk.green(data[el].words));
           }
           if(data[el].relationshipType === 'antonym' && type == 1){
                //ants = data[el].words;
                console.log(chalk.green("Antonyms: \n-----------------------------------------------"));
                console.log(chalk.green(data[el].words));
           }
        }
        console.log();
    });
};

//////////////''''''''''''''''''''''''''''''''''''''''''

function callrelatedCall(data,callback){ 
    //console.log(data);
    API = Host+"/word/"+data+"/relatedWords?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
       
        for(var el in data){
           if(data[el].relationshipType === 'synonym'){
                syns = data[el].words;
                // console.log("Synonyms: ");
                // console.log(syns);
                console.log(chalk.blueBright.bgWhiteBright("Synonym: "+syns[0]));
                s=1;
           }
           if(data[el].relationshipType === 'antonym'){
                ants = data[el].words;
                // console.log("Antonyms: ");
                // console.log(ants);
           }
        }
        //console.log("Related Words: "+syns.length);
        callback(0);
    });
};


function calldefnCall(da,callback){
    API = Host+"/word/"+da+"/definitions?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        for(var el in data){
            defs.push(data[el].text);
        }
        console.log(chalk.blueBright.bgWhiteBright("Definition: "+defs[0]));
        d =1;
        callback(da,ask);
    });
};


function callrandomCall(){
    API = Host+"/words/randomWord?api_key="+Key;
    callExternalApiUsingHttp((data)=>{
        word = data.word;
        //console.log("Word: "+word);
        calldefnCall(word,callrelatedCall);
    });
};




// function callexamples(data,callback{
//     API = Host+"/word/"+data+"/examples?api_key="+Key;
//     callExternalApiUsingHttp((data)=>{
//         for(var el in data.examples){
//             exmpls.push(data.examples[el].text);
            
//         }
//         // console.log("Examples: ");
//         // console.log(exmpls);
//         callback(0);
//     });
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////


var questions = [
    {
      type: 'input',
      name: 'word',
      message: chalk.yellow("What is the word?")
    },
    {
      type: 'list',
      name: 'choice',
      message: chalk.red('Wrong Answer, Select your choice'),
      choices: ['Try Again', 'Hint', 'Quit'],
      
    },
    {
      type: 'list',
      name: 'choice',
      message: chalk.yellow('Select your Hint'),
      choices: ['jumble', 'another Synonym', 'another Antonym', 'another definition'],
      
    }
  ];
  
  
  var check = function(str){
      if(str === word) return true;
      for(var k = s; k<syns.length; k = k+1){
          if(syns[k] === word) {
              return true;
          }
      }
      return false;
  }


  function ask(i) {
    inquirer.prompt(questions[i]).then(answers => {
        if(i==0){
          if(check(answers.word)){
              console.log("Success");
          }
          else{
              ask(1);
          }
        }
  
        if(i==1){
          if(answers.choice === "Try Again"){
              ask(0);
          }
          else if(answers.choice === "Hint"){
              ask(2);
          }
          else{
              console.log("Quitting! Come Again with full energy :)");
          }
        }
  
        if(i==2){
          
          if(answers.choice === "jumble"){
              var j = word.shuffle();
              console.log(chalk.green("Jubled word is: "+j));
              ask(0);
          }
          else if(answers.choice === "another Synonym"){
              if(s >= syns.length-1) {
                 
                  console.log(chalk.red("No More Synonyms, please select other hint"));
                  ask(2);
              }
              else{
                  s =s+1;
                  console.log(chalk.green("Synonym: "+ syns[s]));
                  ask(0);
              }
          }
          else if(answers.choice === "another Antonym"){
              if(a >= ants.length-1) {
                  console.warn(chalk.red(" No More antonyms, please select other hint"));
                  ask(2);
              }
              else{
                  a =a+1;
                  console.log(chalk.green("Antonym: "+ ants[a]));
                  ask(0);
              }
          }
          else{
              if(d >= defs.length-1) {
                  console.warn(chalk.red(" No nore definitions, please select other hint"));
                  ask(2);
              }
              else{
                  d =d+1;
                  console.log(chalk.green("Definition: "+ defs[d]));
                  ask(0);
              }
          }
        }
    });
  }
  
  //ask(0);


var cmd = process.argv[2];
var wrd = process.argv[3];

if(cmd == 'defn'){
    calldefn(wrd);
}
else if(cmd == 'syn'){
    callrelated(wrd,0);
}
else if(cmd == 'ant'){
    callrelated(wrd,1);
}
else if(cmd == 'ex'){
    callexamples(wrd);
}
else if(cmd == 'play'){
    callrandomCall();
}
else if(cmd){
    calldefn(cmd);
    callrelated(cmd,0);
    callrelated(cmd,1);
    callexamples(cmd);
}
else{
    callrandom();
}