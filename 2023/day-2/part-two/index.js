// const path = "../input-example";
const path = "../input"
const file = Bun.file(path)

const text = await file.text()

let powerSum = 0

const colors = ["red", "green", "blue"]

for (const line of text.split("\n")) {
  const gameString = line.substring(line.indexOf(":") + 1)

  const setValues = returnSetValues(gameString)

  const minimumNeededGameValues = minimumGameValue(setValues)
  console.log("minGameVal: ",minimumNeededGameValues)
  let powerMult = 0
  for (const colorValue of minimumNeededGameValues) {
    if (powerMult === 0) powerMult = colorValue
    else powerMult *= colorValue
  }

  powerSum += powerMult
}
console.log("powerSum: ",powerSum)

function returnSetValues(game) {
  const gameSets = game.split(";")

  const setValues = []
  for (var set = 0; set < gameSets.length; set++) {
    setValues[set] = gameSets[set].split(",")
  }

  return setValues
}


function minimumGameValue(gameSets) {
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  for (let i=0; i<gameSets.length; i++) {
    for (let set in gameSets[i]) {
      const matchingColor = colors.find((color) => gameSets[i][set].includes(color))
      const colorValue = parseInt(gameSets[i][set])
      if (matchingColor) {
        if (matchingColor === "red" && parseInt(colorValue) ) {
          if (colorValue > maxRed) maxRed = colorValue
        }
        if (matchingColor === "green" && parseInt(colorValue)) {
          if (colorValue > maxGreen) maxGreen = colorValue
        }
        if (matchingColor === "blue" && parseInt(colorValue)) {
          if (colorValue > maxBlue) maxBlue = colorValue
        }
      }
    }

  }

  console.log(maxRed, maxGreen, maxBlue)

  return [maxRed, maxGreen, maxBlue]

}