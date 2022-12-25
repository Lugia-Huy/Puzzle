<template>
    <div class="container">
        <canvas id="board"></canvas>
        <div class="side-bar">
            <fieldset class="record">
                <legend class="title">TETRIS</legend>
                <label for="eightbit">Your name:</label>
                <input type="text" id="name" class="eightbit" placeholder="Enter..." v-model="name">
                <p>Score: <span id="score">0</span></p>
                <img src="@/assets/ava.jpg" alt="avatar">
            </fieldset>
            <button v-bind:disabled="!name" class="play-btn" id="play"><strong>Play</strong></button>
        </div>
    </div>
</template>
  
<script>
import config from '@/services/config';

export default {
    name: 'Home',
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        // draw layout play area
        const canvas = document.getElementById('board');
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = config.COLS * config.BLOCK_SIZE;
        ctx.canvas.height = config.ROWS * config.BLOCK_SIZE;

        // Class board - create cells, handle game frame
        class Board {
            constructor(ctx) {
                this.ctx = ctx;
                this.grid = this.generateWhiteBoard();
                this.score = 0;
                this.gameOver = false;
                this.isPlaying = false;
            }

            // game frame wallpaper
            generateWhiteBoard() {
                return Array.from({ length: config.ROWS }, () => Array(config.COLS).fill(config.WHITE_COLOR_ID));
            }

            // draw cells game frame
            drawCell(xAxis, yAsis, colorID) {
                this.ctx.fillStyle = config.COLOR_MAPPING[colorID] || config.COLOR_MAPPING[config.WHITE_COLOR_ID];
                this.ctx.fillRect(xAxis * config.BLOCK_SIZE, yAsis * config.BLOCK_SIZE, config.BLOCK_SIZE, config.BLOCK_SIZE);
                this.ctx.fillStyle = 'black';
                this.ctx.strokeRect(xAxis * config.BLOCK_SIZE, yAsis * config.BLOCK_SIZE, config.BLOCK_SIZE, config.BLOCK_SIZE);
            }

            // draw game frame
            drawboard() {
                for (let row = 0; row < this.grid.length; row++) {
                    for (let col = 0; col < this.grid.length; col++) {
                        this.drawCell(col, row, this.grid[row][col]);
                    }
                }
            }

            // clear board
            reset() {
                this.score = 0;
                this.grid = this.generateWhiteBoard();
                this.gameOver = false;
                this.drawboard();
            }

            // handling the row when it filled
            handleCompleteRows() {
                const latestGrid = board.grid.filter((row) => {
                    return row.some(col => col === config.WHITE_COLOR_ID);
                });

                const newScore = config.ROWS - latestGrid.length;
                const newRows = Array.from({ length: newScore }, () => Array(config.COLS).fill(config.WHITE_COLOR_ID));

                if (newScore) {
                    board.grid = [...newRows, ...latestGrid];
                    this.handleScore(newScore * 10);
                }
            }

            // handling the score when 1 row is filled, update score to screen
            handleScore(newScore) {
                this.score += newScore
                document.getElementById('score').innerHTML = this.score;
            }

            // handling stop playing when game over
            handleGameOver() {
                this.gameOver = true;
                this.isPlaying = false;
                var username = document.getElementById('name').value;
                config.scoreData.push({ user: username, score: this.score });
                config.scoreStorage.save(config.scoreData);
                alert('GAME OVER!!!\nYour name: ' + username + '\nYour score: ' + this.score);
            }
        }

        // Class brick - create, control bricks
        class Brick {
            constructor(id) {
                this.id = id;
                this.layout = config.BRICK_LAYOUT[id];
                this.activeIndex = 0;
                this.colPos = 5;
                this.rowPos = -2;
            }

            // draw brick
            drawSubject() {
                for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                    for (let col = 0; col < this.layout[this.activeIndex].length; col++) {
                        if (this.layout[this.activeIndex][row][col] !== config.WHITE_COLOR_ID) {
                            board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                        }
                    }
                }
            }

            // erase brick
            clear() {
                for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                    for (let col = 0; col < this.layout[this.activeIndex].length; col++) {
                        if (this.layout[this.activeIndex][row][col] !== config.WHITE_COLOR_ID) {
                            board.drawCell(col + this.colPos, row + this.rowPos, config.WHITE_COLOR_ID);
                        }
                    }
                }
            }

            // control the brick (left, right, fast down, rotate)
            moveLeft() {
                if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
                    this.clear();
                    this.colPos--;
                    this.drawSubject();
                }
            }

            moveRight() {
                if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
                    this.clear();
                    this.colPos++;
                    this.drawSubject();
                }
            }

            moveDown() {
                if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
                    this.clear();
                    this.rowPos++;
                    this.drawSubject();

                    return;
                }

                this.handleLanded();
                if (!board.gameOver) {
                    generateNewBrick();
                }
            }

            rotate() {
                if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
                    this.clear();
                    this.activeIndex = (this.activeIndex + 1) % 4;
                    this.drawSubject();
                }
            }

            // collision check when brick faceit with game frame or collision with another brick
            checkCollision(nextRow, nextCol, nextLayout) {
                for (let row = 0; row < nextLayout.length; row++) {
                    for (let col = 0; col < nextLayout[0].length; col++) {
                        if (nextLayout[row][col] !== config.WHITE_COLOR_ID && nextRow >= 0) {
                            if (
                                col + nextCol < 0 ||
                                col + nextCol >= config.COLS ||
                                row + nextRow >= config.ROWS ||
                                board.grid[row + nextRow][col + nextCol] !== config.WHITE_COLOR_ID
                            ) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }

            // handling the game frame when the brick hits the bottom or overlaps other bricks 
            handleLanded() {
                if (this.rowPos <= 0) {
                    board.handleGameOver();
                    return;
                }
                for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
                    for (let col = 0; col < this.layout[this.activeIndex].length; col++) {
                        if (this.layout[this.activeIndex][row][col] !== config.WHITE_COLOR_ID) {
                            board.grid[row + this.rowPos][col + this.colPos] = this.id;
                        }
                    }
                }

                board.handleCompleteRows();
                board.drawboard();
            }
        }

        // create random brick
        function generateNewBrick() {
            brick = new Brick(Math.floor(Math.random() * 10) % config.BRICK_LAYOUT.length);
        }

        // declare board and brick
        var board = new Board(ctx);
        board.drawboard();
        var brick;
        generateNewBrick();
        brick.drawSubject();

        // handling play button
        document.getElementById('play').addEventListener('click', () => {
            board.reset();
            board.isPlaying = true;
            generateNewBrick();

            let refresh = setInterval(() => {
                if (!board.gameOver) {
                    brick.moveDown();
                } else {
                    clearInterval(refresh);
                    document.getElementById('play').innerHTML = 'Reset';
                }
            }, 500);
        });

        // handling control on keyboard
        document.addEventListener('keydown', (e) => {
            if (!board.gameOver && board.isPlaying) {
                switch (e.code) {
                    case config.KEY_CODE.LEFT:
                        brick.moveLeft();
                        break;
                    case config.KEY_CODE.RIGHT:
                        brick.moveRight();
                        break;
                    case config.KEY_CODE.UP:
                        brick.rotate();
                        break;
                    case config.KEY_CODE.DOWN:
                        brick.moveDown();
                        brick.moveDown();
                        break;
                }
            }
        });
    },
    methods: {
        getScore(score) {
            this.scoreData.push({ user: this.username, score: score });
        }
    },
}
</script>
  
<style scoped>
.container {
    display: flex;
    grid-template-columns: 320px 200px;
    justify-content: center;
}

.side-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    margin: 0px 0px 0px 15px;
}

#board {
    border: 2px solid #000;
}

.title {
    background: -webkit-linear-gradient(rgb(13, 155, 0), rgb(155, 0, 0));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: (255, 255, 255);
    font-size: 35px;
}

.record {
    border: 3px solid #212529;
    padding: 10px;
}

.nes-field {
    margin-bottom: 10px;
}

.play-btn {
    font-family: 'Press Start 2P', cursive;
    background-color: greenyellow;
    font-size: 16px;
    padding: 15px 30px;
    cursor: pointer;
}

#play {
    display: 'none';
}

.eightbit {
    display: inline-block;
    position: relative;
    text-align: center;
    height: 50px;
    font-size: 14px;
    width: 200px;
    font-family: 'Press Start 2P', cursive;
    color: #212529;
    border: 2px solid black;
    box-shadow: inset (-2px) (-2px) 0px 0px #212529;
}

.eightbit :hover,
.eightbit:focus {
    background: #95b7ec;
    box-shadow: inset (-2px*1.5) (-2px*1.5) 0px 0px #212529;
}

.eightbit:active {
    box-shadow: inset 2px 2px 0px 0px #212529;
}

.eightbit:before,
.eightbit:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
}

.eightbit:before {
    top: -6px;
    left: 0;
    border-top: 6px black solid;
    border-bottom: 6px black solid;
}

.eightbit:after {
    left: -6px;
    top: 0;
    border-left: 6px black solid;
    border-right: 6px black solid;
}

img{
    aspect-ratio: 1/1;
    width: 175px;
}

.play-btn:hover {
    color: #fff;
}
</style>