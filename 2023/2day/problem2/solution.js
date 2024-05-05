const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")

//only 12 red cubes, 13 green cubes, and 14 blue cubes?
const colorMap = {
    'red': 0,
    'green': 1,
    'blue': 2
}
let possibleGameIdsSum = 0;
input.forEach(game => {
    const gameId = game.split(":")[0].split(" ")[1]
    const tries = game.split(":")[1].trim().split(";").map(x=>x.trim())
    let brokenGameFlag = false;
    const maxNumbers = [0, 0 , 0] //0: red, 1:green. 2:blue
    for(evento of tries){
        const tryCubes = evento.split(",").map(x=>x.trim())
        for(cube of tryCubes){
            const color = cube.split(" ")[1]
            const amount = parseInt(cube.split(" ")[0])
            if(amount > maxNumbers[colorMap[color]]){
                maxNumbers[colorMap[color]] = amount
            }
        }
    }
    possibleGameIdsSum += maxNumbers.filter(x=>x!=0).reduce((a,b)=>a*b)
})

console.log(possibleGameIdsSum)