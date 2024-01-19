import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BestScoreManager } from './app.storage.service';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BOARD_SIZE, CellColorsEnum, ControlsEnum, GameModesEnum } from './common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  private interval: number;
  private tempDirection: number;
  private default_mode = GameModesEnum.CLASSIC;
  private isGameOver = false;

  public GameModesEnum = GameModesEnum;
  public board: boolean[][] = [];
  public obstacles: { x: number, y: number }[] = [];
  public score = 0;
  public showMenuChecker = false;
  public gameStarted = false;
  public newBestScore = false;
  public best_score = this.bestScoreService.retrieve();

  private snake = {
    direction: ControlsEnum.LEFT,
    parts: [
      {
        x: -1,
        y: -1
      }
    ]
  };

  private fruit = {
    x: -1,
    y: -1
  };

  constructor(
    private bestScoreService: BestScoreManager
  ) {
  }

  ngOnInit(): void {
    this.setBoard();

    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe(($event: KeyboardEvent) => {
      this.handleKeyboardEvents($event);
    });
  }

  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.keyCode === ControlsEnum.LEFT && this.snake.direction !== ControlsEnum.RIGHT) {
      this.tempDirection = ControlsEnum.LEFT;
    } else if (e.keyCode === ControlsEnum.UP && this.snake.direction !== ControlsEnum.DOWN) {
      this.tempDirection = ControlsEnum.UP;
    } else if (e.keyCode === ControlsEnum.RIGHT && this.snake.direction !== ControlsEnum.LEFT) {
      this.tempDirection = ControlsEnum.RIGHT;
    } else if (e.keyCode === ControlsEnum.DOWN && this.snake.direction !== ControlsEnum.UP) {
      this.tempDirection = ControlsEnum.DOWN;
    }
  }

  setCellColor(colIndex: number, rowIndex: number): string {
    if (this.isGameOver) {
      return CellColorsEnum.GAME_OVER;
    } else if (this.fruit.x === rowIndex && this.fruit.y === colIndex) {
      return CellColorsEnum.FRUIT;
    } else if (this.snake.parts[0].x === rowIndex && this.snake.parts[0].y === colIndex) {
      return CellColorsEnum.HEAD;
    } else if (this.board[colIndex][rowIndex]) {
      return CellColorsEnum.BODY;
    } else if (this.default_mode === GameModesEnum.OBSTACLES && this.checkObstacles(rowIndex, colIndex)) {
      return CellColorsEnum.OBSTACLE;
    }

    return CellColorsEnum.BOARD;
  };

  updatePositions(): void {
    let newHead = this.repositionHead();
    let me = this;

    if (this.default_mode === GameModesEnum.CLASSIC && this.boardCollision(newHead)) {
      return this.gameOver();
    } else if (this.default_mode === GameModesEnum.NO_WALLS) {
      this.noWallsTransition(newHead);
    } else if (this.default_mode === GameModesEnum.OBSTACLES) {
      this.noWallsTransition(newHead);
      if (this.obstacleCollision(newHead)) {
        return this.gameOver();
      }
    }

    if (this.selfCollision(newHead)) {
      return this.gameOver();
    } else if (this.fruitCollision(newHead)) {
      this.eatFruit();
    }

    let oldTail = this.snake.parts.pop() as { x: number, y: number };
    this.board[oldTail.y][oldTail.x] = false;

    this.snake.parts.unshift(newHead);
    this.board[newHead.y][newHead.x] = true;

    this.snake.direction = this.tempDirection;

    setTimeout(() => {
      me.updatePositions();
    }, this.interval);
  }

  repositionHead(): any {
    let newHead = Object.assign({}, this.snake.parts[0]);

    if (this.tempDirection === ControlsEnum.LEFT) {
      newHead.x -= 1;
    } else if (this.tempDirection === ControlsEnum.RIGHT) {
      newHead.x += 1;
    } else if (this.tempDirection === ControlsEnum.UP) {
      newHead.y -= 1;
    } else if (this.tempDirection === ControlsEnum.DOWN) {
      newHead.y += 1;
    }

    return newHead;
  }

  noWallsTransition(part: any): void {
    if (part.x === BOARD_SIZE) {
      part.x = 0;
    } else if (part.x === -1) {
      part.x = BOARD_SIZE - 1;
    }

    if (part.y === BOARD_SIZE) {
      part.y = 0;
    } else if (part.y === -1) {
      part.y = BOARD_SIZE - 1;
    }
  }

  addObstacles(): void {
    let x = this.randomNumber();
    let y = this.randomNumber();

    if (this.board[y][x] === true || y === 8) {
      return this.addObstacles();
    }

    this.obstacles.push({
      x: x,
      y: y
    });
  }

  checkObstacles(x: number, y: number): boolean {
    let res = false;

    this.obstacles.forEach((val) => {
      if (val.x === x && val.y === y) {
        res = true;
      }
    });

    return res;
  }

  obstacleCollision(part: any): boolean {
    return this.checkObstacles(part.x, part.y);
  }

  boardCollision(part: any): boolean {
    return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
  }

  selfCollision(part: any): boolean {
    return this.board[part.y][part.x] === true;
  }

  fruitCollision(part: any): boolean {
    return part.x === this.fruit.x && part.y === this.fruit.y;
  }

  resetFruit(): void {
    let x = this.randomNumber();
    let y = this.randomNumber();

    if (this.board[y][x] === true || this.checkObstacles(x, y)) {
      return this.resetFruit();
    }

    this.fruit = {
      x: x,
      y: y
    };
  }

  eatFruit(): void {
    this.score++;

    let tail = Object.assign({}, this.snake.parts[this.snake.parts.length - 1]);

    this.snake.parts.push(tail);
    this.resetFruit();

    if (this.score % 5 === 0) {
      this.interval -= 15;
    }
  }

  gameOver(): void {
    this.isGameOver = true;
    this.gameStarted = false;
    let me = this;

    if (this.score > this.best_score) {
      this.bestScoreService.store(this.score);
      this.best_score = this.score;
      this.newBestScore = true;
    }

    setTimeout(() => {
      me.isGameOver = false;
    }, 500);

    this.setBoard();
  }

  randomNumber(): any {
    return Math.floor(Math.random() * BOARD_SIZE);
  }

  setBoard(): void {
    this.board = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        this.board[i][j] = false;
      }
    }
  }

  showMenu(): void {
    this.showMenuChecker = !this.showMenuChecker;
  }

  newGame(mode: GameModesEnum): void {
    this.default_mode = mode || GameModesEnum.CLASSIC;
    this.showMenuChecker = false;
    this.newBestScore = false;
    this.gameStarted = true;
    this.score = 0;
    this.tempDirection = ControlsEnum.LEFT;
    this.isGameOver = false;
    this.interval = 150;
    this.snake = {
      direction: ControlsEnum.LEFT,
      parts: []
    };

    for (let i = 0; i < 3; i++) {
      this.snake.parts.push({ x: 8 + i, y: 8 });
    }

    if (mode === GameModesEnum.OBSTACLES) {
      this.obstacles = [];
      let j = 1;
      do {
        this.addObstacles();
      } while (j++ < 9);
    }

    this.resetFruit();
    this.updatePositions();
  }
}
