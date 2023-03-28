import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule as AppCoreModule } from './core/core.module';
import { ScoreTrackingModule } from './score-tracking/score-tracking.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScoreTrackingModule,
    SharedModule,
    AppCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
