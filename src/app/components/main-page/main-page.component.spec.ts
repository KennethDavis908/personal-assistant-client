import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { ToDoListService } from 'src/app/services/to-do-list.service';
import { TaskService } from 'src/app/services/task.service';
import { DailyToDoComponent } from '../daily-to-do/daily-to-do.component';
import { ToDoList } from 'src/app/models/to-do-list';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Task } from 'src/app/models/task';
import { By } from '@angular/platform-browser';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let toDoListService: jasmine.SpyObj<ToDoListService>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockUpsertTask: Task = new Task(0, 'test task', false, 1)

  beforeEach(() => {
    toDoListService = jasmine.createSpyObj('ToDoListService', {
      getByDate: of(new ToDoList(1, new Date(), []))
    })

    taskService = jasmine.createSpyObj('TaskService', {
      upsertTask: of({...mockUpsertTask, id: 1})
    })

    TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        DailyToDoComponent
      ],
      providers: [
        {provide: ToDoListService, useValue: toDoListService},
        {provide: TaskService, useValue: taskService},
      ],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatIconModule,
      ]
    })

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch to do list for today upon initialization', () => {
    expect(toDoListService.getByDate).toHaveBeenCalledTimes(1);
  })

  it('should render a to do list', () => {
    const toDoList = fixture.debugElement.query(By.css('app-daily-to-do'))
    expect(toDoList).toBeTruthy()
  })

  it('#addNewTask(task) should call to upsert the task', () => {
    const toDoList = fixture.debugElement.query(By.css('app-daily-to-do'))
    toDoList.triggerEventHandler('newTaskEvent', mockUpsertTask)
    expect(taskService.upsertTask).toHaveBeenCalledOnceWith(mockUpsertTask)
  })
});
