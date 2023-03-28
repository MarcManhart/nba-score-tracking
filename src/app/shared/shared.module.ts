import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamChooserComponent } from './components/team-chooser/team-chooser.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TeamChooserComponent],
  imports: [CommonModule, FormsModule],
  exports: [TeamChooserComponent],
})
export class SharedModule {}
