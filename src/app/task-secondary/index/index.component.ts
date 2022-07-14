import { Component, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { TaskSecondary } from '../task-secondary';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;
  taskSecondary: TaskSecondary[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public taskSecondaryService: TaskSecondaryService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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

   openDialog() {
    this.dialog.open(CreateComponent, {
      width: '30%',
      data:{
        idPT:this.id,
      }
    });
  }

  
  openDetailsDialog(task:any) {
    this.dialog.open(ViewComponent, {
      width: '30%',
      data : task,
    });
  }
  openEditDialog(task:any) {
    this.dialog.open(EditComponent, {
      width: '30%',
      data : task,
    });
  }
  
  deletePost(id: number) {
    this.taskSecondaryService.delete(id).subscribe((res) => {
      this.taskSecondary = this.taskSecondary.filter((item) => item.id !== id);
      console.log('Post deleted successfully!');
    });
  }
}
