import { Action } from '@ngrx/store';

export enum SnakeScoreActions {
  GetBestScore = '[SnakeScore] Get Best Score',
  SetBestScore = '[SnakeScore] Set Best Score',
  GetBestScoreSuccess = '[SnakeScore] Get Best Score Success',
  GetCurrentScore = '[SnakeScore] Get Current Score',
  SetCurrentScore = '[SnakeScore] Set Current Score',
}

export class GetBestScore implements Action {
  public readonly type = SnakeScoreActions.GetBestScore;
}

export class GetBestScoreSuccess implements Action {
  public readonly type = SnakeScoreActions.GetBestScoreSuccess;

  constructor(public payload: number) {
  }
}

export class SetBestScore implements Action {
  public readonly type = SnakeScoreActions.SetBestScore;

  constructor(public payload: number) {
  }
}

export class SetCurrentScore implements Action {
  public readonly type = SnakeScoreActions.SetCurrentScore;

  constructor(public payload: number) {
  }
}

export class GetCurrentScore implements Action {
  public readonly type = SnakeScoreActions.GetCurrentScore;
}

export type SnakeScoreActionsUnion =
  | GetBestScore
  | GetBestScoreSuccess
  | SetBestScore
  | SetCurrentScore
  | GetCurrentScore;
