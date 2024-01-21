import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const selectSnakeScoreState = (state: AppState) => state.snakeScore;
export const selectCurrentScore = createSelector(
  selectSnakeScoreState,
  (state) => state.currentScore,
);

export const selectSnakeBestScore = createSelector(
  selectSnakeScoreState,
  (state) => state.bestScore,
);

export const selectSnakeCurrentScore = createSelector(
  selectSnakeScoreState,
  (state) => state.currentScore,
);
