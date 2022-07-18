import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ViewComponent } from '../view/view.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

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

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks[event.currentIndex].priority =
      this.tasks[event.currentIndex + 1].priority + 1;
    this.taskService
      .update(this.tasks[event.currentIndex].id, this.tasks[event.currentIndex])
      .subscribe((res: any) => {
        console.log('Post updated successfully!');
      });
  }

  onCheckboxChange(tasks: any) {
    console.log(tasks);

    if (tasks.checked == true) {
      tasks.checked == false;
    } else {
      tasks.checked == true;
    }

    this.taskService.update(tasks.id, tasks).subscribe((res: any) => {
      console.log('Post updated successfully!');
      window.location.reload();
    });
  }

  openDialog() {
    this.dialog.open(CreateComponent, {
      width: '30%',
    });
  }

  openEditDialog(task: any) {
    this.dialog.open(EditComponent, {
      width: '30%',
      data: task,
    });
  }

  openDetailsDialog(task: any) {
    this.dialog.open(ViewComponent, {
      width: '30%',
      data: task,
    });
  }

  deletePost(id: number) {
    var del = confirm('Are you sure you want to delete this task?');
    if (del == true) {
      alert('record deleted');
      this.taskService.delete(id).subscribe((res) => {
        this.tasks = this.tasks.filter((item) => item.id !== id);
        console.log('Post deleted successfully!');
      });
    } else {
      alert('Record Not Deleted');
    }
  }
}
