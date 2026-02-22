// ! don't use global variables - goal is to have as little global code as possible
// * store a gameboard as an array inside of Gameboard Object!
// * Players are going to be stored in Objects

/* DOM VARIABLES (they can be global) */
const ui = {
  playerOne: document.querySelector('#score1'),
  playerTwo: document.querySelector('#score2'),
  iconNow: document.querySelector('.icon__now'),
  gridElement: document.querySelectorAll('.grid__element')
}
ui.gridElement.forEach(element => {
  element.addEventListener('click', e => {
    let targetId = e.currentTarget.id
    let targetIdNum = targetId.substring(targetId.length - 1)
    position = parseInt(targetIdNum)
    gameState1.playRound()
  })
})

//* so 3 objects: game (state of the game), player, gameboard
function gameState () {
  let lastPlayer = 'x'

  const playRound = () => {
    if (lastPlayer === 'x') {
      //! get position not from prompt but from clicked tile
      /* position = prompt(`Gracz: ${player1.name}`) */
      //!
      if (gameboard1.gameboard[position] === '') {
        switchLastPlayer()

        ui.iconNow.src = './icons/cross.svg'
        gameboard1.addToBoard(position, player1)
        gameboard1.showArray()

        hasWon(player1)
      } else if (gameboard1.gameboard[position] === undefined) {
        console.log('select from 1-9')
      } else {
        console.error('Possition occupied')
        lastPlayer = 'x'
        gameboard1.showArray()
      }
    } else if (lastPlayer === 'o') {
      //! get position not from prompt but from clicked tile
      /* position = prompt(`Gracz: ${player2.name}`) */
      //!
      if (gameboard1.gameboard[position] === '') {
        switchLastPlayer()
        ui.iconNow.src = './icons/circle.svg'

        gameboard1.addToBoard(position, player2)
        gameboard1.showArray()

        hasWon(player2)
      } else if (gameboard1.gameboard[position] === undefined) {
        console.log('select from 1-9')
      } else {
        console.error('Possition occupied')
        lastPlayer = 'o'
        gameboard1.showArray()
      }
    }
  }
  const switchLastPlayer = () => {
    if (lastPlayer === 'x') {
      lastPlayer = 'o'
      return 'o'
    } else {
      lastPlayer = 'x'
      return 'x'
    }
  }
  const hasWon = player => {
    //* check if someone has won. if not playRound()

    /* for now poorly writen - can do it better with for? n, n+1, n+2? n, n+3, n+6 */
    if (
      /* horizontal lines win */
      (gameboard1.gameboard[0] === player.sign &&
        gameboard1.gameboard[1] === player.sign &&
        gameboard1.gameboard[2] === player.sign) ||
      (gameboard1.gameboard[3] === player.sign &&
        gameboard1.gameboard[4] === player.sign &&
        gameboard1.gameboard[5] === player.sign) ||
      (gameboard1.gameboard[6] === player.sign &&
        gameboard1.gameboard[7] === player.sign &&
        gameboard1.gameboard[8] === player.sign) ||
      /* vertical lines win */
      (gameboard1.gameboard[0] === player.sign &&
        gameboard1.gameboard[3] === player.sign &&
        gameboard1.gameboard[6] === player.sign) ||
      (gameboard1.gameboard[1] === player.sign &&
        gameboard1.gameboard[4] === player.sign &&
        gameboard1.gameboard[7] === player.sign) ||
      (gameboard1.gameboard[2] === player.sign &&
        gameboard1.gameboard[5] === player.sign &&
        gameboard1.gameboard[8] === player.sign) ||
      /* diagonal lines win */
      (gameboard1.gameboard[0] === player.sign &&
        gameboard1.gameboard[4] === player.sign &&
        gameboard1.gameboard[8] === player.sign) ||
      (gameboard1.gameboard[2] === player.sign &&
        gameboard1.gameboard[4] === player.sign &&
        gameboard1.gameboard[6] === player.sign)
    ) {
      console.log(`${player.name} Has won!`)
      player.givePlayerPoints()
      console.log(player.getPlayerPoints())
      ui.playerOne.innerText = player.getPlayerPoints()
    } else {
      gameState1.isDraw()
    }
  }
  const isDraw = player => {
    let isEmpty = 0
    for (let i = 0; i < gameboard1.gameboard.length; i++) {
      if (gameboard1.gameboard[i] != '') {
        isEmpty++
      }
    }
    if (isEmpty === 0) {
      console.log(`It's a draw!`)
    } else {
      console.log(`Not a draw yet!`)
    }
  }
  return { playRound, hasWon, isDraw, lastPlayer, switchLastPlayer }
}
const gameState1 = gameState()

function createGameBoard (player) {
  const gameboard = ['', '', '', '', '', '', '', '', '']
  const addToBoard = (position, player) => {
    if (gameboard[position] === '') {
      gameboard.splice(position, 1, player.sign)
    } else {
      console.log('Position occupied')
    }
  }
  const showArray = () => {
    console.log(`${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]}`)
    console.log(`${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]}`)
    console.log(`${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]}`)
  }
  return { gameboard, addToBoard, showArray }
}
const gameboard1 = createGameBoard()
//*player function (takes name.) circle and cross (2players). So i have to create two new players /factory function? can i use function closures?
function createPlayer (name, sign) {
  let points = 0
  const getPlayerPoints = () => {
    console.log(points)
  }
  const givePlayerPoints = () => {
    points++
  }
  return { sign, name, getPlayerPoints, givePlayerPoints }
}
const player1 = createPlayer('Player1', 'o')
const player2 = createPlayer('Player2', 'x')

/* gameboard1.addToBoard(1, player1)
gameboard1.addToBoard(2, player2)
gameboard1.addToBoard(4, player1)
gameboard1.addToBoard(6, player2)
gameboard1.addToBoard(7, player1) */
/* gameState1.playRound() */

console.log(
  `${gameboard1.gameboard[0]} | ${gameboard1.gameboard[1]} | ${gameboard1.gameboard[2]}`
)
console.log(
  `${gameboard1.gameboard[3]} | ${gameboard1.gameboard[4]} | ${gameboard1.gameboard[5]}`
)
console.log(
  `${gameboard1.gameboard[6]} | ${gameboard1.gameboard[7]} | ${gameboard1.gameboard[8]}`
)

//*gameboard array [ , , ] [ , , ] [ , , ] (3 rows, 3 collumns). I will have to somehow call object and put my choices at specific position in array. ex. /playerX(9)? puts X in bottom right corner

//!        UI        UI        UI        UI        UI        UI        UI        UI        UI

//? testing: You should be checking for all winning 3-in-a-rows and ties. | Don’t forget the logic that keeps players from playing in spots that are already taken!
