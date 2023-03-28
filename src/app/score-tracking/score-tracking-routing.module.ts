import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const scoreTrackingRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(scoreTrackingRoutes)],
  exports: [RouterModule],
})
export class ScoreTrackingRoutingModule {}
