<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

# Inverted Tic Tac Toe 🎯

## Basic Details

### Team Name: Bug Hunters

### Team Members

- Team Lead: Albin K Joby - Sahrdaya Collage of Engineering and Technology
- Member 2: Abel M B - Sahrdaya Collage of Engineering and Technology

### Project Description

An inverted Tic Tac Toe game where the AI deliberately tries to lose, and your challenge is to force it to accidentally win!

### The Problem (that doesn't exist)

What if AI was too good at losing? What if we needed to challenge players to outsmart an AI that's trying its best to avoid winning?

### The Solution (that nobody asked for)

A completely backwards Tic Tac Toe game where the AI uses reverse psychology and tries to lose, making it ironically harder for humans to win!

## Technical Details

### Technologies/Components Used

For Software:

- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Web Design
- Local Storage for game state

For Hardware:

- None

### Implementation

For Software:

# Installation

```bash
git clone https://github.com/albinjoby/Inverted-Tic-Tac-Toe.git
cd Inverted-Tic-Tac-Toe
```

# Run

```bash
# Simply open index.html in your browser
open index.html
# Or serve it locally
python -m http.server 8000
# Then visit http://localhost:8000
```

### Project Documentation

For Software:

# Screenshots (Add at least 3)

![Game Screen](https://github.com/user-attachments/assets/1318f1a2-cbe1-4efa-ba01-d672c68a8ad7)
_Main game interface showing the inverted tic-tac-toe board_

![Help Screen](https://github.com/user-attachments/assets/fc058b62-1e34-444f-8f02-8a3008984422)
_Help modal explaining the game rules and how to play_

![Game End Screen](https://github.com/user-attachments/assets/3682f2cc-15d9-4955-ab48-21fa86f0f457)
_Game over modal showing the result_

# Diagrams

```mermaid
flowchart TD
  Start[Start Game] --> Init[Initialize 3x3 Board]
  Init --> PlayerTurn[Player's Turn]
  PlayerTurn --> CheckPlayerLose{Does player have 3 in a row?}
  CheckPlayerLose -- Yes --> PlayerLose[Player loses → Game Over]
  CheckPlayerLose -- No --> AITurn[AI's Turn]
  AITurn --> AIChoose[AI selects move to avoid winning]
  AIChoose --> CheckAILose{Does AI have 3 in a row?}
  CheckAILose -- Yes --> AILose[AI loses → Player wins]
  CheckAILose -- No --> BoardFull{Is board full?}
  BoardFull -- Yes --> Draw[Draw → No one loses]
  BoardFull -- No --> PlayerTurn
  ```

For Hardware:

# Schematic & Circuit

None

# Build Photos

<!-- ![Components](Add photo of your components here)
_List out all components shown_

![Build](Add photos of build process here)
_Explain the build steps_ -->

![Final](https://github.com/user-attachments/assets/1318f1a2-cbe1-4efa-ba01-d672c68a8ad7)

### Project Demo

# Video

https://github.com/user-attachments/assets/0ed2203c-b2ed-4531-8b83-ec08d0ac7422
_Explain what the video demonstrates_

# Additional Demos

- None

## Team Contributions

- Albin K Joby: MiniMax and Alpha Beta Pruning
- Abel M B: Html, Css and Js

---

Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)
