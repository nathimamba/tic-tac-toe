const Game = () => {
  // Select DOM elements
  const main = document.querySelector('main');
  const form = document.querySelector('form');
  const player1Input = document.querySelector('.player1s');
  const player2Input = document.querySelector('.player2s');
  const boxes = document.querySelectorAll('.box');
  const restartButton = document.querySelector('.restart');
  const newGameButton = document.querySelector('.newGame');
  const loader = document.querySelector('.loader');
  const info = document.querySelector('.info');
  const player1Name = document.querySelector('.player1');
  const player2Name = document.querySelector('.player2');

  // Initialize game variables
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameEnded = false;

  // Define winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Handle box click
  const handleBoxClick = (index) => {
    if (!gameEnded && board[index] === '') {
      board[index] = currentPlayer;
      boxes[index].textContent = currentPlayer;
      boxes[index].style.color = currentPlayer === 'X'? '#ec1650' : '#fcce32';

      if (checkWinner()) {
        gameEnded = true;
        showPopup(`Player ${currentPlayer} wins!`);
      } else if (isDraw()) {
        gameEnded = true;
        showPopup("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X'? 'O' : 'X';
      }
    }
  };

  // Check for winner
  const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  // Check for draw
  const isDraw = () => {
    return board.every((box) => box!== '');
  };

 // Show popup message
const showPopup = (message) => {
  setTimeout(() => {
    alert(`Player ${currentPlayer === 'X' ? player1Name.textContent : player2Name.textContent} wins!`);
  }, 1000);
};

  // Add event listeners
  boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
      handleBoxClick(index);
    });
  });

  restartButton.addEventListener('click', () => {
    resetGame();
  });

  newGameButton.addEventListener('click', () => {
    resetForm();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const player1 = player1Input.value.trim();
    const player2 = player2Input.value.trim();

    if (player1 === '' || player2 === '') {
      alert("Please enter names for both players.");
      return;
    }

    startGame(player1, player2);
  });

  // Start game function
  const startGame = (player1, player2) => {
    player1Name.textContent = player1;
    player2Name.textContent = player2;
    loader.style.display = 'none';
    info.style.display = 'none';
    main.style.display = 'block';
    resetGame();
  };

  // Reset game function
  const resetGame = () => {
    board.fill('');
    boxes.forEach((box) => {
      box.textContent = '';
      box.style.color = '';
    });
    currentPlayer = 'X';
    gameEnded = false;
  };

  // Reset form function
  const resetForm = () => {
    form.reset();
    info.style.display = 'flex';
    main.style.display = 'none';
  };

  // Hide loader and show form on page load
  const init = () => {
    loader.style.display = 'flex';
    info.style.display = 'none';
    main.style.display = 'none';

    setTimeout(() => {
      loader.style.display = 'none';
      info.style.display = 'flex';
      main.style.display = 'none';
    }, 3000);
  };

  return {
    init,
  };
};

const game = Game();
game.init();