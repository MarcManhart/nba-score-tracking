import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatsCardComponent } from './team-stats-card.component';

describe('TeamStatsCardComponent', () => {
  let component: TeamStatsCardComponent;
  let fixture: ComponentFixture<TeamStatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamStatsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
