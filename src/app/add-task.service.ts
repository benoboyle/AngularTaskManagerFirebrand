import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private apiUrl = 'http://localhost:5092/api/Tasks';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to add a new task
  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task); // Send task directly without headers
  }

  getLastLoginUser(): Observable<string> {
    return this.http.get<string>('http://localhost:5092/api/user/latest-login', { responseType: 'text' as 'json' }); // Use responseType: 'text'
}


  // Method to retrieve all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to update task status
  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}/status`, `"${newStatus}"`, { headers: { 'Content-Type': 'application/json' } });
  }

  // Method to delete a task by ID
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  // Method to get tasks by username (if needed)
  getTasksByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`);
  }
}
