import { Component, Inject, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  id!: any;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskSecondaryService: TaskSecondaryService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<CreateComponent>
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    const str = location.href;
    const res = str.split('/');
    const last = res[res.length - 1];

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      principalTaskId: new FormControl(Number(last), [Validators.required]),
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
    this.taskSecondaryService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.form.reset();
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
