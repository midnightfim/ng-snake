import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeComponent } from './snake.component';
import { SnakeBoardComponent } from './snake-board/snake-board.component';
import { SnakeHeaderComponent } from './snake-header/snake-header.component';


@NgModule({
  declarations: [SnakeComponent, SnakeBoardComponent, SnakeHeaderComponent],
  exports: [
    SnakeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SnakeModule {
}
