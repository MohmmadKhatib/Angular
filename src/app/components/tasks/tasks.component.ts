import { Component } from '@angular/core';
import { Task } from 'src/app/Task';
import { TASKS } from 'src/app/mock-tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskservice: TaskService) {}

  ngOnInit(): void {
    this.taskservice.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTask(task: Task) {
    this.taskservice
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  onToggle(task: Task) {
    task.reminder = !task.reminder;
    this.taskservice.updateTaskReminder(task).subscribe();
  }
}
