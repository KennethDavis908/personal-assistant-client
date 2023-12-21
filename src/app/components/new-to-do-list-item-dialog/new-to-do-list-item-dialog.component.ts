import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';

/** Error when invalid control is dirty, touched, or submitted. */
class TaskErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const validateTaskName = (control: AbstractControl<string>): ValidationErrors | null => {
  if (control.value === '') return {empty: true}
  else return null
}

@Component({
  selector: 'app-new-to-do-list-item-dialog',
  templateUrl: './new-to-do-list-item-dialog.component.html',
  styleUrls: ['./new-to-do-list-item-dialog.component.css']
})
export class NewToDoListItemDialogComponent {

  taskFormControl = this.formBuilder.nonNullable.control<string>('', [Validators.required, validateTaskName])

  matcher = new TaskErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<NewToDoListItemDialogComponent>,
    public formBuilder: FormBuilder
  ) {}

  @HostListener('window:keyup.Enter')
  close(): void {
    if(this.taskFormControl.value) {
      this.dialogRef.close(new Task(0, this.taskFormControl.value, false, 0))
    } 
    this.taskFormControl.markAsTouched();
  }

  onNoClick = (): void => {
    this.dialogRef.close();
  }

  
}
