const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")

//only 12 red cubes, 13 green cubes, and 14 blue cubes?
const cubes = {
    'red': 12,
    'green': 13,
    'blue': 14
}
let possibleGameIdsSum = 0;
input.forEach(game => {
    const gameId = game.split(":")[0].split(" ")[1]
    const tries = game.split(":")[1].trim().split(";").map(x=>x.trim())
    let brokenGameFlag = false;
    for(evento of tries){
        const tryCubes = evento.split(",").map(x=>x.trim())
        for(cube of tryCubes){
            const color = cube.split(" ")[1]
            const amount = parseInt(cube.split(" ")[0])
            if(amount > cubes[color]){ 
                brokenGameFlag = true;
                break;
            }
        }
        if(brokenGameFlag) break;
    }
    if(!brokenGameFlag) possibleGameIdsSum += parseInt(gameId)
    console.log(parseInt(gameId))
})

console.log(possibleGameIdsSum)