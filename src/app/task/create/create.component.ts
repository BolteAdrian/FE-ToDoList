import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskService: TaskService,
    private dialogRef: MatDialogRef<CreateComponent>
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      checked: new FormControl(false, [Validators.required]),
      priority: new FormControl(1, [Validators.required]),
      assignedUser: new FormControl('', [Validators.required]),
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
    this.taskService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.form.reset();
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
