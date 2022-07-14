import { Component, Inject, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSecondary } from '../task-secondary';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id!: number;
  taskSecondary!: TaskSecondary;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskSecondaryService: TaskSecondaryService,
    private dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.editData.id;
    this.taskSecondaryService.find(this.id).subscribe((data: TaskSecondary) => {
      this.taskSecondary = data;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
