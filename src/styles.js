import styled from 'styled-components'

const availableDirections = {
  [[0, -1]]: '0deg',
  [[1, 0]]: '90deg', //right,
  [[0, 1]]: '180deg', //down,
  [[-1, 0]]: '270deg' //left
}

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Cell = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
`

export const NavigationButtons = styled.button``

export const EmojiComponent = styled.div`
  transform: rotate(${({ rotationDirection }) => availableDirections[rotationDirection]});
`
