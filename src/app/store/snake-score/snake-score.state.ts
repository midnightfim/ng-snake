export interface SnakeScoreState {
  currentScore: number;
  bestScore: number;
}

export const initialSnakeScoreState: SnakeScoreState = {
  currentScore: 0,
  bestScore: 0,
}

export function getInitialSnakeScoreState(): SnakeScoreState {
  return initialSnakeScoreState;
}
