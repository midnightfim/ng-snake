import { initialSnakeScoreState, SnakeScoreState } from './snake-score';

export interface AppState {
  snakeScore: SnakeScoreState;
}

export const initialAppState: AppState = {
  snakeScore: initialSnakeScoreState,
}

export function getInitialState(): AppState {
  return initialAppState;
}
