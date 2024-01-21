import { Component, DestroyRef, inject, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectSnakeBestScore, selectSnakeCurrentScore } from '../../store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-snake-header',
  templateUrl: './snake-header.component.html',
  styleUrl: './snake-header.component.scss'
})
export class SnakeHeaderComponent {
  @Input() showNewBestScoreAnimation: boolean;

  private readonly destroy: DestroyRef = inject(DestroyRef);

  bestScore = this.store.pipe(select(selectSnakeBestScore), takeUntilDestroyed(this.destroy));
  currentScore = this.store.pipe(select(selectSnakeCurrentScore), takeUntilDestroyed(this.destroy));

  constructor(
    private store: Store<AppState>
  ) {
  }
}
