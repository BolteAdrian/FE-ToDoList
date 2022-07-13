import { Component, OnInit } from '@angular/core';
import { TaskSecondaryService } from '../task-secondary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskSecondary } from '../task-secondary';

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
    private route: ActivatedRoute,
    private router: Router
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
  }
}
