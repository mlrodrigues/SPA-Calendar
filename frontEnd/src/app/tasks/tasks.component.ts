import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  constructor(private service: TasksService, @Inject(LOCALE_ID) private locale: string) { this.findAll(); }
  
  tasks: Tasks[] = [];
  task: Tasks = new Tasks();
  id: number = 0;
  title: string = "";
  descrption: string = "";
  date: string = "";
  hour: string = "";
  time: string = "";
  
  ngOnInit(): void { }
  
  findAll(): void {
    this.service.findAll().subscribe((data) => {
      this.tasks = data;
      this.id;
      this.descrption = "";
      this.hour = "";
      this.date = "";
      this.time = "";
      console.log(data);
    });
  }
  
  done(task: Tasks) {
    task.done = true;
    this.update(task);
  }

  create() {
    this.service.create(this.task).subscribe((_) => {
      this.findAll(), (this.task = new Tasks());
    });
  }
  
  update(task: Tasks) {
    this.service.update(task)
    .subscribe(_ => { this.findAll(), this.task = new Tasks() });
  }
 
  remove(id: number) {
    this.service.delete(id)
    .subscribe(_ => this.findAll());
  }
  
  prepareUpdate(task: Tasks) {
    this.task.title = task.title;
    this.task.descrption = task.descrption;
    this.task.date = formatDate(task.date,'yyyy-MM-dd',this.locale);
    this.task.hour = task.hour;
    this.task.time = task.time;
  }
  
  
}
