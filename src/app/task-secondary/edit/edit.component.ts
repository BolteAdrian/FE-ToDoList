import { Component, Inject, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSecondary } from '../task-secondary';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: number;
  taskSecondary!: TaskSecondary;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskSecondaryService: TaskSecondaryService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.taskSecondaryService.find(this.id).subscribe((data: TaskSecondary) => {
      this.taskSecondary = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      principalTaskId: new FormControl('', [Validators.required]),
      objective: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      checked: new FormControl(false, [Validators.required]),
      priority: new FormControl(1, [Validators.required]),
      assignedUser: new FormControl('', [Validators.required]),
    });

    this.id = this.editData.id;
    this.taskSecondaryService.find(this.id).subscribe((data: TaskSecondary) => {
      this.taskSecondary = data;
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
    this.taskSecondaryService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log('Post updated successfully!');
        this.form.reset();
        this.dialogRef.close();
        window.location.reload();
      });
  }

}
