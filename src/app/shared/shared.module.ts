import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamChooserComponent } from './components/team-chooser/team-chooser.component';
import { OverviewComponent } from '../score-tracking/pages/overview/overview.component';



@NgModule({
  declarations: [
    TeamChooserComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
