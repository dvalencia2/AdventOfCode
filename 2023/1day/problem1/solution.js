const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")

const getCalibrationNumber = (calibrationDocument) => {

    let firstDigit = NaN
    let lastDigit = NaN
    let sum = 0;
    for (let i = 0; i < calibrationDocument.length; i++) {
        const currentTextLine = calibrationDocument[i];
        for (let j = 0; j < currentTextLine.length; j++) {
            if(isNaN(parseInt(currentTextLine[j]))) continue;
            firstDigit = currentTextLine[j]
            break;
        }

        for (let k = currentTextLine.length -1; k >=0; k--) {
            if(isNaN(parseInt(currentTextLine[k]))) continue;
            lastDigit = currentTextLine[k]
            break;
        }
        if(isNaN(firstDigit) || isNaN(lastDigit)){
            throw new Error("numbers are NaN");
        }
        const concatedNumber = firstDigit+lastDigit
        sum += parseInt(concatedNumber);
    }
    return sum;
}

console.log(getCalibrationNumber(input))