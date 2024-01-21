import { getInitialSnakeScoreState, SnakeScoreState } from './snake-score.state';
import { SnakeScoreActions, SnakeScoreActionsUnion } from './snake-score.actions';

export const snakeScoreReducer = (
  state = getInitialSnakeScoreState(),
  action: SnakeScoreActionsUnion
): SnakeScoreState => {
  console.log(action)
  switch (action.type) {
    case SnakeScoreActions.GetBestScoreSuccess:
      return {
        ...state,
        bestScore: action.payload
      };
    case SnakeScoreActions.SetCurrentScore:
      return {
        ...state,
        currentScore: action.payload
      };
    case SnakeScoreActions.SetBestScore:
      return {
        ...state,
        bestScore: action.payload
      };
    default:
      return state;
  }
};
