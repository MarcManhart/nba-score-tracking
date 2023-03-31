import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamStoreService } from 'src/app/shared/services/team-store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  public trackedTeamsIds: number[] = [];

  constructor(private teamStoreService: TeamStoreService) {
    this.subscriptions.push(
      this.teamStoreService.teamIdsSubject.subscribe({
        next: (ids) => (this.trackedTeamsIds = ids),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
