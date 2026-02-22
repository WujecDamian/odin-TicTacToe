// ! don't use global variables - goal is to have as little global code as possible
// * store a gameboard as an array inside of Gameboard Object!
// * Players are going to be stored in Objects

/* DOM VARIABLES (they can be global) */
const ui = {
  playerOne: document.querySelector('#score1'),
  playerTwo: document.querySelector('#score2'),
  iconNow: document.querySelector('.icon__now'),
  gridElement: document.querySelectorAll('.grid__element'),
  gameAlert: document.querySelector('.game__alert'),
  restartBtn: document.querySelector('#restart-btn')
}
//* so 3 objects: game (state of the game), player, gameboard
function gameState () {
  let lastPlayer = 'x'
  ui.gridElement.forEach(element => {
    element.addEventListener('click', e => {
      let targetId = e.currentTarget.id
      let targetIdNum = targetId.substring(targetId.length - 1)
      position = parseInt(targetIdNum)
      if (lastPlayer === 'o') {
        if (gameboard1.gameboard[position] === '') {
          e.currentTarget.children[0].src = './icons/cross.svg'
        }
      } else {
        if (gameboard1.gameboard[position] === '') {
          e.currentTarget.children[0].src = './icons/circle.svg'
        }
      }
      gameState1.playRound()
    })
  })

  const playRound = () => {
    if (lastPlayer === 'x') {
      //! get position not from prompt but from clicked tile
      /* position = prompt(`Gracz: ${player1.name}`) */
      //!
      if (gameboard1.gameboard[position] === '') {
        switchLastPlayer()

        ui.iconNow.setAttribute('src', './icons/cross.svg')

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
        ui.iconNow.setAttribute('src', './icons/circle.svg')

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
      if (player.sign === 'o') {
        ui.playerOne.innerText = `${player.getPlayerPoints()}`
        ui.gameAlert.innerText = `${player.name} Won!`
        setTimeout(() => {
          ui.gameAlert.innerText = ``
        }, 2000)
      } else {
        ui.playerTwo.innerText = `${player.getPlayerPoints()}`
        ui.gameAlert.innerText = `${player.name} Won!`
        setTimeout(() => {
          ui.gameAlert.innerText = ``
        }, 2000)
      }
      gameState1.resetGame()
    } else {
      gameState1.isDraw()
    }
  }

  const isDraw = player => {
    let isFull = 0
    for (let i = 0; i < 9; i++) {
      if (gameboard1.gameboard[i] != '') {
        isFull++
      }
    }
    if (isFull === 9) {
      console.log(`It's a draw!`)
      ui.gameAlert.innerText = `Draw!`
      gameState1.resetGame()

      setTimeout(() => {
        ui.gameAlert.innerText = ``
      }, 2000)
    } else {
    }
  }
  const resetGame = () => {
    setTimeout(() => {
      gameboard1.clearArray()
      gameboard1.gameboard.length = 0
      gameboard1.clearArray()

      /*     for (let i = 0; i < 9; i++) {
      gameboard1.gameboard[i] = ''
    } */
      console.log('Next round!')
    }, 2000)
    ui.gridElement.forEach(element => {
      setTimeout(() => {
        element.children[0].src = ''
      }, 2000)
    })
  }
  return { playRound, hasWon, isDraw, resetGame }
}

const gameState1 = gameState()
function createPlayer (name, sign) {
  let points = 0
  const getPlayerPoints = () => {
    return points
  }
  const givePlayerPoints = () => {
    points++
  }
  const resetPoints = () => {
    points = 0
  }

  return { sign, name, getPlayerPoints, givePlayerPoints, resetPoints }
}
const player1 = createPlayer(prompt('Give player 1 Name!'), 'o')

const player2 = createPlayer(prompt('Give player 2 Name!'), 'x')
function createGameBoard (player) {
  let gameboard = ['', '', '', '', '', '', '', '', '']
  const addToBoard = (position, player) => {
    if (gameboard[position] === '') {
      gameboard.splice(position, 1, player.sign)
    } else {
      console.log('Position occupied')
    }
  }
  const clearArray = boardArray => {
    for (let i = 0; i < 9; i++) {
      gameboard[i] = ''
    }
  }
  const showArray = () => {
    console.log(`${gameboard[0]} | ${gameboard[1]} | ${gameboard[2]}`)
    console.log(`${gameboard[3]} | ${gameboard[4]} | ${gameboard[5]}`)
    console.log(`${gameboard[6]} | ${gameboard[7]} | ${gameboard[8]}`)
  }
  return { gameboard, addToBoard, showArray, clearArray }
}
const gameboard1 = createGameBoard()
//*player function (takes name.) circle and cross (2players). So i have to create two new players /factory function? can i use function closures?

ui.restartBtn.addEventListener('click', () => {
  player1.resetPoints()
  player2.resetPoints()
  ui.playerOne.innerText = `${player1.getPlayerPoints()}`
  ui.playerTwo.innerText = `${player2.getPlayerPoints()}`
})

/* gameboard1.addToBoard(1, player1)
gameboard1.addToBoard(2, player2)
gameboard1.addToBoard(4, player1)
gameboard1.addToBoard(6, player2)
gameboard1.addToBoard(7, player1) */
/* gameState1.playRound() */

//*gameboard array [ , , ] [ , , ] [ , , ] (3 rows, 3 collumns). I will have to somehow call object and put my choices at specific position in array. ex. /playerX(9)? puts X in bottom right corner

//!        UI        UI        UI        UI        UI        UI        UI        UI        UI

//? testing: You should be checking for all winning 3-in-a-rows and ties. | Don’t forget the logic that keeps players from playing in spots that are already taken!
