import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamChooserComponent } from './components/team-chooser/team-chooser.component';

@NgModule({
  declarations: [TeamChooserComponent],
  imports: [CommonModule, FormsModule],
  exports: [TeamChooserComponent],
})
export class SharedModule {}
