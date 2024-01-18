import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BestScoreManager } from './app.storage.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    BestScoreManager
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
