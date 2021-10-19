#!/usr/bin/env node
const process = require("process");
const fs = require("fs");
let inputArray = process.argv.slice(2);
let commandArray = [];
let filesArray = [];

for(let i = 0; i < inputArray.length; i++) {
    let firstChar = inputArray[i].charAt(0);
    if (firstChar == '-') {
        commandArray.push(inputArray[i]);
    }
    else {
        filesArray.push(inputArray[i]);
    }
}

let isSPresent = commandArray.includes("-s");
let isNPresent = commandArray.includes("-n");
let isBPresent = commandArray.includes("-b"); 

if(isNPresent == true && isBPresent == true) {
    console.log("Enter either -n or -b, not togather");
    return;
}

for(let i=0; i < filesArray.length; i++) {
    let isPresent = fs.existsSync(filesArray[i]);
    if (isPresent == false) {
        console.log('File ${filesArray[i]} does not exist');
        return;
    }
}

let content = "";
for(let i = 0; i < filesArray.length; i++) {
    let bufferContent = fs.readFileSync(filesArray[i]);
    content += bufferContent + '\r\n';
}

let contentArr = content.split('\r\n');

//-s

if (isSPresent == true) {
    let resultArr = [contentArr[0]];
    for(let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i-1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i-1] == null) {
            contentArr[i] = null;
        }
        else {
            resultArr.push(contentArr[i]);
        }
    }
    contentArr = resultArr;
}

//-n
if (isNPresent == true) {
    for(let i = 0; i < contentArr.length; i++) {
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

//-b => number only where something is written
if (isBPresent == true) {
    let counter=1;
    for(let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));
    
// f1 f2 > f3  => to replace f3 with the content of f1 and f2
// f1 f2 >> f3 => to append f3 with the content of f1 and f2
