const path = "../input-example";
// const path = "../input"
const file = Bun.file(path)

const text = await file.text()

const lines = text.split("\r\n")
let partNumbersSum = 0
const isCharASymbol = char => char !== "." && isNaN(char)


for (let line=0; line<lines.length; i++) {
  for (let j=0; j<line.length; j++) {
    const char = line[j]
    const isCharNumber = !isNaN(char)
    const isLastCharNumber = !isNaN(line[j-1])
    const isNextCharNumber = !isNaN(line[j+1])
    const number= parseInt(isLastCharNumber + isCharNumber + isNextCharNumber)
    if (isCharNumber || !isLastCharNumber || !isNextCharNumber) {
      const numberInfo = {
        startCoord: isLastCharNumber ? [line, j-1] : [line, j],
        endCoord: isNextCharNumber ? [line, j+1] : [line, j],
      }
      if (hasAdjacentSymbols(numberInfo)) {
        partNumbersSum += number
      }
    }

  }
}

function hasAdjacentSymbols(numberInfo) {
  const [startI, endI] = numberInfo.startCoord
  const [startJ, endJ] = numberInfo.endCoord

  const matrixHasPreviousLine = lines[startI-1]
  const matrixHasNextLine = lines[endI+1]
   
  let hasSymbol = false
  
  if (matrixHasPreviousLine) {
    const previousLine = lines[startI-1]
    const previousLineHasSymbol = isCharASymbol(previousLine[startJ])
    const previousLineHasNextSymbol = isCharASymbol(previousLine[endJ])
    hasSymbol = previousLineHasSymbol || previousLineHasNextSymbol
  }
}