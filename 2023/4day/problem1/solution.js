const fs = require('fs')

const inputFile = fs.readFileSync("./input.txt", 'utf-8')
const input = inputFile.split("\n")


const findMatchesAmount = (winningNumbers, myNumbers)=>{
  // Convert arr2 to a Set for constant-time lookups
  const set2 = new Set(winningNumbers);

  // Use filter to get the intersection of the two arrays
  const matchingNumbers = myNumbers.filter((num) => set2.has(num));
  console.log(matchingNumbers);
  return matchingNumbers.length;
}

let points = 0;

for (let i = 0; i < input.length ; i++){
  console.log('i',i);
  const line = input[i];
  console.log('line',line);
  const [, tickets] = line.split(':');
  if(!tickets)continue;
  console.log('tickets', tickets);
  let [winningNumbers, myNumbers] = tickets.split('|');
  winningNumbers = winningNumbers.trim().split(' ').map(parseInt).filter(x=>!isNaN(x));
  myNumbers = myNumbers.trim().split(' ').map(parseInt).filter(x=>!isNaN(x));

  matchesFound = findMatchesAmount(winningNumbers, myNumbers);
  console.log('matches found', matchesFound);
  if (matchesFound == 0) {
    continue;
  } else {
    points += (2**(matchesFound))/2;
    console.log('points', points);
  }
}

console.log(points);
