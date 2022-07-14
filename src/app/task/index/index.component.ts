import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  tasks: Task[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public taskService: TaskService, private dialog: MatDialog) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.taskService.getAll().subscribe((data: Task[]) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  openDialog() {
    this.dialog.open(CreateComponent, {
      width: '30%',
    });
  }

  openEditDialog(task:any) {
    this.dialog.open(EditComponent, {
      width: '30%',
      data : task,
    });
  }

  openDetailsDialog(task:any) {
    this.dialog.open(ViewComponent, {
      width: '30%',
      data : task,
    });
  }

  deletePost(id: number) {
    this.taskService.delete(id).subscribe((res) => {
      this.tasks = this.tasks.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }
}
