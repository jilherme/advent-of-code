import { open } from 'node:fs/promises';

// https://adventofcode.com/2023/day/1

export default async function main() {
  const file = await open('../input');

  let sum = 0

  for await (const line of file.readLines()) {
    sum += getLineCalibrationNumber(line)
  }

console.log(`The sum of all of the calibration values is: ${sum}`)
}


/** 
* Return the number of firstNumber concatenated with the last
* number of the line
* @param {string} line - Entire line string value
* @return {number} The calibrationNumber of a line
*/
function getLineCalibrationNumber(line) {
  const charArray = Array.from(line)
  // slice() creates a shallow copy of the array, so it don't modify the value referenced
  const reversedArray = charArray.slice().reverse()

  const firstLineNumber = charArray.find((string) => !isNaN(string))
  const lastLineNumber = reversedArray.find((string) => !isNaN(string))

  // returns, as a number, the concatenation of two strings that are numbers
  return Number(firstLineNumber + lastLineNumber)
  

  // console.log("firstLineNumber: ", firstLineNumber)
}

// const isCharANumber(string) {
//   const castNumber = Number(string)
// }

main();