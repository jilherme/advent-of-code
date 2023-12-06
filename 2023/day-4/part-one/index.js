// const path = "../input-example"
const path = "../input"
const file = Bun.file(path)

const text = await file.text()
const lines = text.split("\r\n")

const cardPointsTable = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 4,
  "4": 8,
  "5": 16,
  "6": 32,
  "7": 64,
  "8": 128,
  "9": 256,
  "10": 512,
}

let cardPointsSum = 0

for (const line of lines) {
  console.log(line)
  const winningNumbersString = line.substring(line.indexOf(":") + 1, line.indexOf('|'))
  const scratchedNumbersString = line.substring(line.indexOf("|") + 1)

  const returnNumbersArray = (str) => str.trim().split(" ")

  const winningNumbers = returnNumbersArray(winningNumbersString)
  const scratchedNumbers = returnNumbersArray(scratchedNumbersString)

  function cardMatches(winning, scratched) {
    let matches = 0
    winning.forEach(element => {
      const isWinningNumber = scratched.find((item) => item === element) 
      if (isWinningNumber) matches+=1
    });
    return matches
  }
  
  const totalMatches = cardMatches(winningNumbers, scratchedNumbers)
  cardPointsSum += cardPointsTable[totalMatches]
}

console.log(cardPointsSum)


