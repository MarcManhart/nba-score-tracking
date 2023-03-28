import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreTrackingRoutingModule } from './score-tracking-routing.module';
import { TeamStatsCardComponent } from './components/team-stats-card/team-stats-card.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TeamStatsCardComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScoreTrackingRoutingModule
  ]
})
export class ScoreTrackingModule { }
