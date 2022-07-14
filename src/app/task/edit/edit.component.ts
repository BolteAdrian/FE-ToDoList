import { Component, inject, Inject, INJECTOR, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number;
  task!: Task;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      objective: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      checked: new FormControl(false, [Validators.required]),
      priority: new FormControl(1, [Validators.required]),
      assignedUser: new FormControl('', [Validators.required]),
    });

    this.id = this.editData.id;
    this.taskService.find(this.id).subscribe((data: Task) => {
      this.task = data;
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  closeDialog() {
    this.dialogRef.close();
  }
  submit() {
    console.log(this.form.value);
    this.taskService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Post updated successfully!');
      this.form.reset();
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
