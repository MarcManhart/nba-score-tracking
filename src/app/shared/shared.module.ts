import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamChooserComponent } from './components/team-chooser/team-chooser.component';

@NgModule({
  declarations: [TeamChooserComponent],
  imports: [CommonModule],
  exports: [TeamChooserComponent],
})
export class SharedModule {}
