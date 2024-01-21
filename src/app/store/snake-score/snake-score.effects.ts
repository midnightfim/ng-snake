import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnakeScoreService } from '../../common';
import { GetBestScoreSuccess, SetBestScore, SnakeScoreActions, SnakeScoreActionsUnion } from './snake-score.actions';
import { map, tap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class SnakeScoreEffects {
  constructor(private actions$: Actions, private snakeScoreService: SnakeScoreService) {
  }

  getBestScore$ = createEffect(
    () => this.actions$.pipe(
      ofType(SnakeScoreActions.GetBestScore),
      map(() => new GetBestScoreSuccess(this.snakeScoreService.getBestScore()))
    )
  );

  setBestScore$ = createEffect(
    () => this.actions$.pipe(
      ofType(SnakeScoreActions.SetBestScore),
      tap((action: SetBestScore) => this.snakeScoreService.setNewBestScore(action.payload)),
      map((action: SetBestScore) => new GetBestScoreSuccess(action.payload))
    )
  );
}
