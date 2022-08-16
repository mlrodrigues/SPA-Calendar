import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  create(tasks: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(`${this.URL}/tasks`, tasks);
  }

  update(tasks: Tasks): Observable<Tasks[]> {
    return this.httpClient.patch<Tasks[]>(`${this.URL}/tasks/${tasks.id}`, tasks);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.URL}/tasks/${id}`);
  }

  findAll(): Observable<Tasks[]> {
    return this.httpClient.get<Tasks[]>(`${this.URL}/tasks`);
  }
}
