import { open } from "node:fs/promises"
// https://adventofcode.com/2023/day/1

export default async function main() {
  // const file = await open("../input-example") expects 281
  const file = await open("../input")

  let sum = 0

  for await (const line of file.readLines()) {
    console.log("line: ", line)
    const lineResult = getLineCalibrationNumber(line)
    sum += lineResult
  }

  console.log(`The sum of all of the calibration values is: ${sum}`)
}

const numbersInFullObj = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

const numbersInFull = Object.keys(numbersInFullObj)

/**
 * Return the number of firstNumber concatenated with the last
 * number of the line
 * @param {string} line - Entire line string value
 * @return {number} The calibrationNumber of a line
 */

function getLineCalibrationNumber(line) {
  const charArray = Array.from(line)
  const reversedArray = charArray.slice().reverse()

  let hasNumberInFull = false
  for (const word of numbersInFull) {
    if (hasNumberInFull) break

    hasNumberInFull = line.includes(word)
  }
  let firstLineNumber = null
  let lastLineNumber = null
  if (!hasNumberInFull) {
    firstLineNumber = charArray.find((string) => !isNaN(string))
    lastLineNumber = reversedArray.find((string) => !isNaN(string))

    // returns, as a number, the concatenation of two strings that are numbers
    return Number(firstLineNumber + lastLineNumber)
  } else {
    // run through the normal array array
    for (let i = 0; i < charArray.length; i++) {
      if (isCharANumber(charArray[i])) {
        firstLineNumber = charArray[i]
        break
      } else {
        const currentFormedString = charArray.slice(0, i + 1).join("")
        // console.log("currentFormedString: ", currentFormedString)

        let foundNumber = false

        for (const word of numbersInFull) {
          if (currentFormedString.includes(word)) {
            firstLineNumber = numbersInFullObj[word]
            foundNumber = true
            break
          }
        }

        if (foundNumber) break
      }
    }

    for (let i = charArray.length - 1; i >= 0; i--) {
      // first check if the current char is a number
      if (isCharANumber(charArray[i])) {
        lastLineNumber = charArray[i]
        break
      }
      // test to see if the current string is a number in full
      else {
        let currentFormedString = ""
        let foundNumber = false
        for (let j = i; j < charArray.length; j++) {
          currentFormedString += charArray[j]
          // console.log("currentFormedString: ", currentFormedString)
          if (numbersInFull.includes(currentFormedString)) {
            lastLineNumber = numbersInFullObj[currentFormedString]

            foundNumber = true
            break
          }
        }

        if (foundNumber) break
      }
      // console.log("currentFormedString: ", currentFormedString)
    }

    console.log(
      `${firstLineNumber} and ${lastLineNumber}`,
      Number(firstLineNumber + lastLineNumber)
    )
    return Number(String(firstLineNumber) + String(lastLineNumber))
  }
}

const isCharANumber = (string) => !isNaN(string)

main()
