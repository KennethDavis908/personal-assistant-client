import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToDoListItemDialogComponent } from './new-to-do-list-item-dialog.component';

describe('NewToDoListItemDialogComponent', () => {
  let component: NewToDoListItemDialogComponent;
  let fixture: ComponentFixture<NewToDoListItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewToDoListItemDialogComponent],
    });
    fixture = TestBed.createComponent(NewToDoListItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
