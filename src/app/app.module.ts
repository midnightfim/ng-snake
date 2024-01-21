import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SnakeModule } from './snake/snake.module';
import { StoreModule } from '@ngrx/store';
import { AppReducers, SnakeScoreEffects } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SnakeModule,
    StoreModule.forRoot(AppReducers, {}),
    EffectsModule.forRoot([SnakeScoreEffects])
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
