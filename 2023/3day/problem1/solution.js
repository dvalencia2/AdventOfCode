const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")

console.log(input[139][23])

const isNumber = (possibleNumber) => {
    return !isNaN(parseInt(possibleNumber));
}
console.log(input.length)
console.log(input[0].length)

const getAdjacents = (i, j, matrix) =>{
    const adj = []
    //up
    if(i-1 >=0){
        adj.push(input[i-1][j])
    }

    //down
    if(i+1 < matrix.length){
        adj.push(input[i+1][j])
    }

    //left
    if(j-1 >=0){
        adj.push(input[i][j-1])
    }

    //right
    if(j+1 < matrix[0].length){
        adj.push(input[i][j+1])
    }

    //up-left
    if(i-1 >=0 && j-1 >=0){
        adj.push(input[i-1][j-1])
    }

    //up-right
    if(i-1 >=0 && j+1 < matrix[0].length){
        adj.push(input[i-1][j+1])
    }

    //down-left
    if(i+1 < matrix.length && j-1 >=0){
        adj.push(input[i+1][j-1])
    }

    //down-right
    if(i+1 < matrix.length && j+1 < matrix[0].length){
        adj.push(input[i+1][j+1])
    }

    return adj
}

const isSymbol = (possibleSymbol) => {
    return possibleSymbol !== '.' && isNaN(parseInt(possibleSymbol));
}

let finalSum = 0;
for (let i = 0; i < input.length; i++) {
    const row = input[i]
    for (let j = 0; j < row.length; j++) {
        if (!isNumber(input[i][j])) continue;

        let jumpCounter = 0;
        let formedNumber = '';
        const foundNumberPositions = []
        while(isNumber(input[i][j+jumpCounter])){
            formedNumber += input[i][j + jumpCounter];
            foundNumberPositions.push([i,j + jumpCounter])
            jumpCounter++;
        }
        const filteredSymbols = foundNumberPositions.filter(([i,j]) => {
            const adjacents = getAdjacents(i,j,input)
            const adjacentsWithSymbols = adjacents.filter(isSymbol)
            return adjacentsWithSymbols.length > 0
        })

        if(filteredSymbols.length > 0){
            finalSum += parseInt(formedNumber)
        }

        j += jumpCounter;


    }
}

console.log(finalSum)
