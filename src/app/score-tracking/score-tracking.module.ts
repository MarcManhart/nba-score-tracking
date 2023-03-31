import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResultsCardComponent } from './components/results-card/results-card.component';
import { TeamStatsCardComponent } from './components/team-stats-card/team-stats-card.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ResultsComponent } from './pages/results/results.component';
import { ScoreTrackingRoutingModule } from './score-tracking-routing.module';



@NgModule({
  declarations: [
    TeamStatsCardComponent,
    OverviewComponent,
    ResultsComponent,
    ResultsCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScoreTrackingRoutingModule
  ]
})
export class ScoreTrackingModule { }
