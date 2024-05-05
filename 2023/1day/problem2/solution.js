const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")
const numberMap = {
    'one': '1',
    'two':'2',
    'three': '3',
    'four': '4',
    'five' : '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}
const spelledNumbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
]
const isCharNumber = (currentCharacter) => {
    return !isNaN(parseInt(currentCharacter));
}

const getCalibrationNumber = (calibrationDocument) => {

    let firstDigit = NaN
    let lastDigit = NaN
    let sum = 0;
    for (let i = 0; i < calibrationDocument.length; i++) {
        const currentTextLine = calibrationDocument[i];
        console.log('line '+ currentTextLine);
        let j = 0
        let foundWrittenNumber = undefined;
        for (j = 0; j < currentTextLine.length; j++) {
            if (isCharNumber(currentTextLine[j])) break;
            const charactersLeft = currentTextLine.length - j;
            const searchableNumbers = [...spelledNumbers].filter( x =>x.length <= charactersLeft)
            //console.log('searchableNumbers', searchableNumbers)
            if (searchableNumbers.length == 0) continue;

            for (let charNumber of searchableNumbers) {
                //console.log('text portion', currentTextLine.slice(j,j + charNumber.length), charNumber)
                if(charNumber == currentTextLine.slice(j,j + charNumber.length)){
                    foundWrittenNumber = numberMap[charNumber]
                    break
                }
            }
            if(foundWrittenNumber) break;
        }

        firstDigit = foundWrittenNumber? foundWrittenNumber:currentTextLine[j]
        
        let k = 0
        let foundWrittenNumber2 = undefined;
        for (k = currentTextLine.length - 1; k >=0; k--) {
            if (isCharNumber(currentTextLine[k])) break;
            const charactersLeft = currentTextLine.length - k;
            const searchableNumbers = [...spelledNumbers].filter( x =>x.length <= charactersLeft)
            if (searchableNumbers.length == 0) continue;
            for (let charNumber of searchableNumbers) {
                //console.log("length: ",currentTextLine.length,'k: ', k, 'text portion', currentTextLine.slice(k,k+charNumber.length), charNumber)
                if(charNumber == currentTextLine.slice(k,k + charNumber.length)){
                    foundWrittenNumber2 = numberMap[charNumber]
                    //console.log('found: ', foundWrittenNumber2)
                    break
                }
            }
            if(foundWrittenNumber2) break;
        }
        
        lastDigit = foundWrittenNumber2?foundWrittenNumber2:currentTextLine[k]
        
        if(isNaN(firstDigit) || isNaN(lastDigit)){

            throw new Error("numbers are NaN");
        }
        //console.log('first number ',firstDigit, ' second number: ', lastDigit)
        const concatedNumber = firstDigit+lastDigit
        console.log(concatedNumber)
        sum += parseInt(concatedNumber);
    }
    return sum;
}
console.log(getCalibrationNumber(input))