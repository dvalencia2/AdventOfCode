const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")


const isNumber = (possibleNumber) => {
    return !isNaN(parseInt(possibleNumber));
}
const getAdjacents = (i, j, matrix) =>{
    const adj = []
    //up
    if(i-1 >=0){
        adj.push({x:i-1, y:j, value: input[i-1][j]})
    }

    //down
    if(i+1 < matrix.length){
        adj.push({x: i+1, y:j, value: input[i+1][j]})
    }

    //left
    if(j-1 >=0){
        adj.push({x:i, y:j-1, value: input[i][j-1]})
    }

    //right
    if(j+1 < matrix[0].length){
        adj.push({x:i, y: j+1, value: input[i][j+1]})
    }

    //up-left
    if(i-1 >=0 && j-1 >=0){
        adj.push({x: i-1, y: j-1, value: input[i-1][j-1]})
    }

    //up-right
    if(i-1 >=0 && j+1 < matrix[0].length){
        adj.push({x: i-1, y:j+1, value: input[i-1][j+1]})
    }

    //down-left
    if(i+1 < matrix.length && j-1 >=0){
        adj.push({x: i+1, y: j-1, value: input[i+1][j-1]})
    }

    //down-right
    if(i+1 < matrix.length && j+1 < matrix[0].length){
        adj.push({x: i+1, y:j+1, value: input[i+1][j+1]})
    }

    return adj
}

const symbolMap = new Map();

const isSymbol = (possibleSymbol) => {
    return possibleSymbol !== '.' && isNaN(parseInt(possibleSymbol));
}

const isGear = (possibleGear) => {
  return possibleGear === '*';
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
        const currentGear = [-1,-1]
        foundNumberPositions.forEach(([i,j]) => {
            const adjacents = getAdjacents(i,j,input)
            const adjacentsGears = adjacents.filter(x=> isGear(x.value))
            adjacentsGears.forEach( adjacent => {
              const {x, y, value} = adjacent;
              if(x == currentGear[0] && y == currentGear[1]){
                return;
              }
              currentGear[0] = x;
              currentGear[1] = y;
              const foundGear = symbolMap.get(JSON.stringify([x,y]));
              if(!foundGear){
                symbolMap.set(JSON.stringify([x,y]), []);
              }
              symbolMap.set(JSON.stringify([x,y]), [...symbolMap.get(JSON.stringify([x,y])), parseInt(formedNumber)]);
            })
        })

        
        j += jumpCounter;
    }
}


for(const [key, value] of symbolMap){
  console.log(key,value)
  if(value.length == 2){
    finalSum += (value[0] * value[1]);
  }
}
console.log(finalSum)
