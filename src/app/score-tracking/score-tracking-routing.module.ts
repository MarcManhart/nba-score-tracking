import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';

const scoreTrackingRoutes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(scoreTrackingRoutes)],
  exports: [RouterModule],
})
export class ScoreTrackingRoutingModule {}
