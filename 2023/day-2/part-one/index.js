// const path = "./input-example";
const path = "../input"
const file = Bun.file(path)

const text = await file.text()

let gameSum = 0

for (const line of text.split("\n")) {
  const isLineGamePossible = isGamePossible(line)
  if (!isGamePossible(line)) continue
  console.log(`${line}\n${isLineGamePossible}\n`)

  gameSum += returnGameId(line)
}
console.log(gameSum)


function isGamePossible(line) {
  const gameString = line.substring(line.indexOf(":") + 1)
  // const [R, G, B] = returnGameRGBSum(gameString)
  // R <= 12
  // G <= 13
  // B <= 14
  const colors = ["red", "green", "blue"]

  const setValues = returnSetValues(gameString)
  for (let i=0; i<setValues.length; i++) {
    console.log(setValues[i])
    for (let set in setValues[i]) {
      const matchingColor = colors.find((color) => setValues[i][set].includes(color))
      const colorValue = parseInt(setValues[i][set])
      if (matchingColor) {
        if (matchingColor === "red" && parseInt(colorValue) > 12) return false
        if (matchingColor === "green" && parseInt(colorValue) > 13) return false
        if (matchingColor === "blue" && parseInt(colorValue) > 14) return false
      }
    }
  }
  // const isRedValid = R <= 12
  // const isGreenValid = G <= 13
  // const isBlueValid = B <= 14

  // const isGameValid = isRedValid && isGreenValid && isBlueValid

  return true
}

function returnGameId(line) {
  const gameId = line.substring(5, line.indexOf(":")) // get only number
  return parseInt(gameId)
}

// function returnGameRGBSum(game) {
//   const gameSets = game.split(";")

//   const setValues = []
//   for (var set =0; set < gameSets.length; set++) {
//     setValues[set] = gameSets[set].split(",")
//   }

//   // console.log(setValues)
//   const colors = ["red", "green", "blue"]

//   // use reduce to create an object with the sum of each color
//   // const RGB = setValues.flat().reduce(function (acc, val) {
//   //   const matchingColor = colors.find(color => val.includes(color));

//   //   if (matchingColor in acc) acc[matchingColor] += parseInt(val)
//   //   else acc[matchingColor] = parseInt(val)

//   //   return acc
//   // }, {})

//   const R = RGB.red
//   const G = RGB.green
//   const B = RGB.blue

//   return [R, G, B]
// }

function returnSetValues(game) {
  const gameSets = game.split(";")

  const setValues = []
  for (var set = 0; set < gameSets.length; set++) {
    setValues[set] = gameSets[set].split(",")
  }

  return setValues
}
