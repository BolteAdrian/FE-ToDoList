import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id!: number;
  task!: Task;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ViewComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
   

    this.id = this.editData.id;
    this.taskService.find(this.id).subscribe((data: Task) => {
      this.task = data;
    });

  }

  
  closeDialog() {
    this.dialogRef.close();
  }

}
