import { snakeScoreReducer } from './snake-score';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';

export const AppReducers: ActionReducerMap<AppState, any> = {
    snakeScore: snakeScoreReducer,
};

