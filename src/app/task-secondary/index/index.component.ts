import { Component, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { TaskSecondary } from '../task-secondary';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ViewComponent } from '../view/view.component';
import { Location } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  id!: number;
  taskSecondary: TaskSecondary[] = [];
  selection = new SelectionModel<TaskSecondary>(true, []);

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskSecondaryService: TaskSecondaryService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _location: Location
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.taskSecondaryService
      .getChilds(this.id)
      .subscribe((data: TaskSecondary[]) => {
        this.taskSecondary = data;
        console.log(this.taskSecondary);
      });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  /** The label for the checkbox on the passed row */
  /** The label for the checkbox on the passed row */

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.taskSecondary,
      event.previousIndex,
      event.currentIndex
    );
    this.taskSecondary.forEach((task, idx) => {
      task.id = idx + 1;
    });
  }

  onCheckboxChange(taskSecondary: any) {
    console.log(taskSecondary);

    if (taskSecondary.checked == true) {
      taskSecondary.checked == false;
    } else {
      taskSecondary.checked == true;
    }

    this.taskSecondaryService
      .update(taskSecondary.id, taskSecondary)
      .subscribe((res: any) => {
        console.log('Post updated successfully!');
        window.location.reload();
      });
  }

  openDialog() {
    this.dialog.open(CreateComponent, {
      width: '30%',
      data: {
        idPT: this.id,
      },
    });
  }

  backClicked() {
    this._location.back();
  }

  openDetailsDialog(task: any) {
    this.dialog.open(ViewComponent, {
      width: '30%',
      data: task,
    });
  }
  openEditDialog(task: any) {
    this.dialog.open(EditComponent, {
      width: '30%',
      data: task,
    });
  }

  deletePost(id: number) {
    var del = confirm('Are you sure you want to delete this task?');
    if (del == true) {
      alert('record deleted');
      this.taskSecondaryService.delete(id).subscribe((res) => {
        this.taskSecondary = this.taskSecondary.filter(
          (item) => item.id !== id
        );
        console.log('Task deleted successfully!');
      });
    } else {
      alert('Record Not Deleted');
    }
  }
}
