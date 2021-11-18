import { useState, useEffect, useMemo } from 'react'
import { Grid, Column, Cell, NavigationButtons, EmojiComponent } from './styles'
import { STRING } from './resources/string'

const NUMBER_OF_ROWS = 10
const NUMBER_OF_COLUMNS = 10
// 1. draw the grid
// 2. create rotation for roomba
// 3. handle navigation and grid update
// 4. handle the boundaries

const availableDirections = [
  [0, -1], //top
  [1, 0], //right,
  [0, 1], //down,
  [-1, 0] //left
]

const App = () => {
  const [cells, setCells] = useState([])
  const [rotationDirection, setRotationDirection] = useState(availableDirections[0])

  const populateCells = () => {
    let cellsInitializer = []
    for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++) {
      cellsInitializer[rowIndex] = []
      for (let columnIndex = 0; columnIndex < NUMBER_OF_COLUMNS; columnIndex++) {
        cellsInitializer[rowIndex][columnIndex] = false
      }
    }
    cellsInitializer[1][2] = true
    return cellsInitializer
  }

  useEffect(() => {
    const freshCells = populateCells()
    setCells(freshCells)
  }, [])

  const currentRoombaPosition = useMemo(() => {
    let currentRoombaPosition = []
    for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < cells[rowIndex]?.length; columnIndex++) {
        if (cells[rowIndex][columnIndex] === true) {
          currentRoombaPosition = [rowIndex, columnIndex]
        }
      }
    }
    return currentRoombaPosition
  }, [cells])

  const handelCellComputing = () => {
    let newRoombaPosition = cells
    const newRowPosition = currentRoombaPosition[0] + rotationDirection[0]
    const newColumPosition = currentRoombaPosition[1] + rotationDirection[1]

    // handling boundaries
    if (
      !(
        newRowPosition >= 0 &&
        newRowPosition < NUMBER_OF_ROWS &&
        newColumPosition >= 0 &&
        newColumPosition < NUMBER_OF_COLUMNS
      )
    ) {
      handleRotation()
      return
    }
    newRoombaPosition[newRowPosition][newColumPosition] =
      !newRoombaPosition[newRowPosition][newColumPosition]

    newRoombaPosition[currentRoombaPosition[0]][currentRoombaPosition[1]] =
      !newRoombaPosition[currentRoombaPosition[0]][currentRoombaPosition[1]]

    setCells([...newRoombaPosition])
  }

  const handleRotation = () => {
    if (rotationDirection === availableDirections[0]) {
      setRotationDirection(availableDirections[1])
    } else if (rotationDirection === availableDirections[1]) {
      setRotationDirection(availableDirections[2])
    } else if (rotationDirection === availableDirections[2]) {
      setRotationDirection(availableDirections[3])
    } else if (rotationDirection === availableDirections[3]) {
      setRotationDirection(availableDirections[0])
    }
  }

  return (
    <>
      <NavigationButtons onClick={handleRotation}>
        {STRING.buttonSection.turnRight}
      </NavigationButtons>
      <NavigationButtons onClick={handelCellComputing}>
        {STRING.buttonSection.moveForwardButton}
      </NavigationButtons>
      <Grid>
        {cells.map((rows, columnIndex) => (
          <Column key={columnIndex}>
            {rows.map((cellState, rowIndex) => (
              <Cell key={`${columnIndex}-${rowIndex}`}>
                {cellState && (
                  <EmojiComponent rotationDirection={rotationDirection}>👆</EmojiComponent>
                )}
              </Cell>
            ))}
          </Column>
        ))}
      </Grid>
    </>
  )
}

export default App
