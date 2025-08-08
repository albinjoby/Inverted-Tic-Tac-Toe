class TicTacToe {
  constructor() {
    this.board = Array(9).fill(" ");
    this.humanPlayer = "O";
    this.aiPlayer = "X";
    this.gameBoard = document.getElementById("gameBoard");
    this.turnIndicator = document.getElementById("turnIndicator");
    this.gameOverModal = document.getElementById("gameOverModal");
    this.gameResult = document.getElementById("gameResult");
    this.gameMessage = document.getElementById("gameMessage");
    this.newGameBtn = document.getElementById("newGameBtn");
    this.playAgainBtn = document.getElementById("playAgainBtn");
    this.helpBtn = document.getElementById("helpBtn");
    this.helpModal = document.getElementById("helpModal");
    this.closeHelpBtn = document.getElementById("closeHelpBtn");

    this.isAiTurn = false;
    this.gameActive = true;

    this.initializeEventListeners();
    this.initializeGame();
  }
  initializeEventListeners() {
    // Cell click events
    this.gameBoard.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        const index = parseInt(e.target.dataset.index);
        this.handleCellClick(index);
      }
    });

    // New game button
    this.newGameBtn.addEventListener("click", () => {
      this.initializeGame();
    });

    // Play again button
    this.playAgainBtn.addEventListener("click", () => {
      this.hideGameOverModal();
      this.initializeGame();
    });

    // Help button
    this.helpBtn.addEventListener("click", () => {
      this.showHelpModal();
    });

    // Close help button
    this.closeHelpBtn.addEventListener("click", () => {
      this.hideHelpModal();
    });

    // Close help modal when clicking outside
    this.helpModal.addEventListener("click", (e) => {
      if (e.target === this.helpModal) {
        this.hideHelpModal();
      }
    });
  }

  initializeGame() {
    this.board = Array(9).fill(" ");
    this.gameActive = true;
    this.clearBoard();
    this.hideGameOverModal();

    // Since radio buttons are commented out, use random start
    this.isAiTurn = Math.random() < 0.5;

    this.updateTurnIndicator();

    if (this.isAiTurn) {
      setTimeout(() => this.makeAiMove(), 1000);
    }
  }

  clearBoard() {
    const cells = this.gameBoard.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("occupied", "animate", "winning");
    });
  }

  availableMoves() {
    return this.board
      .map((spot, index) => (spot === " " ? index : null))
      .filter((index) => index !== null);
  }

  makeMove(position, player) {
    if (this.board[position] === " ") {
      this.board[position] = player;
      this.updateCell(position, player);
      return true;
    }
    return false;
  }

  updateCell(position, player) {
    const cell = document.querySelector(`[data-index="${position}"]`);
    cell.textContent = player;
    cell.classList.add("occupied", "animate");

    // Remove animation class after animation completes
    setTimeout(() => {
      cell.classList.remove("animate");
    }, 400);
  }

  isBoardFull() {
    return !this.board.includes(" ");
  }

  checkWinner() {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        this.board[i] === this.board[i + 1] &&
        this.board[i + 1] === this.board[i + 2] &&
        this.board[i] !== " "
      ) {
        this.highlightWinningCells([i, i + 1, i + 2]);
        return this.board[i];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i] === this.board[i + 3] &&
        this.board[i + 3] === this.board[i + 6] &&
        this.board[i] !== " "
      ) {
        this.highlightWinningCells([i, i + 3, i + 6]);
        return this.board[i];
      }
    }

    // Check diagonals
    if (
      this.board[0] === this.board[4] &&
      this.board[4] === this.board[8] &&
      this.board[0] !== " "
    ) {
      this.highlightWinningCells([0, 4, 8]);
      return this.board[0];
    }

    if (
      this.board[2] === this.board[4] &&
      this.board[4] === this.board[6] &&
      this.board[2] !== " "
    ) {
      this.highlightWinningCells([2, 4, 6]);
      return this.board[2];
    }

    return null;
  }

  highlightWinningCells(positions) {
    positions.forEach((pos) => {
      const cell = document.querySelector(`[data-index="${pos}"]`);
      cell.classList.add("winning");
    });
  }

  gameOver() {
    return this.checkWinner() !== null || this.isBoardFull();
  }

  minimax(depth, alpha, beta, isMaximizing) {
    const winner = this.checkWinner();
    if (winner === this.aiPlayer) {
      return 1; // AI wins (bad for inverted AI)
    }
    if (winner === this.humanPlayer) {
      return -1; // Human wins (good for inverted AI)
    }
    if (this.isBoardFull()) {
      return 0;
    }

    if (isMaximizing) {
      // Human trying to win
      let bestScore = -Infinity;
      for (let move of this.availableMoves()) {
        this.board[move] = this.humanPlayer;
        let score = this.minimax(depth + 1, alpha, beta, false);
        this.board[move] = " ";
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
      return bestScore;
    } else {
      // Inverted AI trying to lose
      let bestScore = Infinity; // AI wants worst score
      for (let move of this.availableMoves()) {
        this.board[move] = this.aiPlayer;
        let score = this.minimax(depth + 1, alpha, beta, true);
        this.board[move] = " ";
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
      return bestScore;
    }
  }

  getWorstMove() {
    let worstScore = Infinity;
    let worstMove = null;
    let alpha = -Infinity;
    let beta = Infinity;

    for (let move of this.availableMoves()) {
      this.board[move] = this.aiPlayer;
      let score = this.minimax(0, alpha, beta, true); // Human's turn next
      this.board[move] = " ";

      if (score < worstScore) {
        worstScore = score;
        worstMove = move;
      }

      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }
    }

    return worstMove;
  }

  handleCellClick(index) {
    if (!this.gameActive || this.isAiTurn || this.board[index] !== " ") {
      return;
    }

    this.makeMove(index, this.humanPlayer);

    if (this.gameOver()) {
      this.endGame();
      return;
    }

    this.isAiTurn = true;
    this.updateTurnIndicator();

    // Add thinking animation
    this.gameBoard.classList.add("ai-thinking");
    this.turnIndicator.classList.add("pulse");

    setTimeout(() => this.makeAiMove(), 1500);
  }

  makeAiMove() {
    if (!this.gameActive) return;

    const move = this.getWorstMove();
    if (move !== null) {
      this.makeMove(move, this.aiPlayer);
    }

    // Remove thinking animation
    this.gameBoard.classList.remove("ai-thinking");
    this.turnIndicator.classList.remove("pulse");

    if (this.gameOver()) {
      this.endGame();
      return;
    }

    this.isAiTurn = false;
    this.updateTurnIndicator();
  }

  updateTurnIndicator() {
    if (this.isAiTurn) {
      this.turnIndicator.textContent = "AI's turn";
      this.turnIndicator.classList.add("ai-turn");
    } else {
      this.turnIndicator.textContent = "Your turn";
      this.turnIndicator.classList.remove("ai-turn");
    }
  }

  endGame() {
    this.gameActive = false;

    setTimeout(() => {
      const winner = this.checkWinner();
      let resultText, messageText;

      if (winner === this.aiPlayer) {
        resultText = "Oops! The AI accidentally won 😅";
        messageText = "The AI failed to lose this time. Try again!";
      } else if (winner === this.humanPlayer) {
        resultText = "You win! The AI successfully lost 👏";
        messageText =
          "Congratulations! You made the AI throw the game. Don't forget to share your winning strategy!";
      } else {
        resultText = "It's a tie!";
        messageText = "Neither player could win this round.";
      }

      this.showGameOverModal(resultText, messageText);
    }, 1000);
  }

  showGameOverModal(resultText, messageText) {
    this.gameResult.textContent = resultText;
    this.gameMessage.textContent = messageText;
    this.gameOverModal.classList.add("show");
  }

  hideGameOverModal() {
    this.gameOverModal.classList.remove("show");
  }

  showHelpModal() {
    this.helpModal.classList.add("show");
  }

  hideHelpModal() {
    this.helpModal.classList.remove("show");
  }
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new TicTacToe();
});
