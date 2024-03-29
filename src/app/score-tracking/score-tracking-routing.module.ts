import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { ResultsComponent } from './pages/results/results.component';

const scoreTrackingRoutes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    pathMatch: 'full',
  },
  {
    path: 'results/:teamCode',
    component: ResultsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(scoreTrackingRoutes)],
  exports: [RouterModule],
})
export class ScoreTrackingRoutingModule {}
