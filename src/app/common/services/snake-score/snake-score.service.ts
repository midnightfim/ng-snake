import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SnakeScoreService {
  private readonly SNAKE_SCORE_KEY = 'ng_snake_score';

  setNewBestScore(score: number): void {
    localStorage.setItem(this.SNAKE_SCORE_KEY, JSON.stringify(score));
  }

  getBestScore(): number {
    let bestScore = localStorage.getItem(this.SNAKE_SCORE_KEY);
    console.log('bestScore', bestScore);
    if (!bestScore) {
      this.setNewBestScore(0);
      return 0;
    }

    return +bestScore;
  }
}
