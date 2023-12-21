import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyToDoComponent } from './daily-to-do.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('DailyToDoComponent', () => {
  let component: DailyToDoComponent;
  let fixture: ComponentFixture<DailyToDoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyToDoComponent],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatIconModule,
      ]
    });
    fixture = TestBed.createComponent(DailyToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
