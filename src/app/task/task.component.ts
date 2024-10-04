import { Component } from '@angular/core';
import { AddTaskService } from '../add-task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TaskComponent {
  showNewTask = false;
  showAllTasks = false;

  newTask = {
    Title: '',
    Description: '',
    DueDate: '',
    Priority: 'Low',
    Status: 'Planned',  // Default status
    Username: ''
  };

  tasks: any[] = [];

  constructor(private addTaskService: AddTaskService) {}

  toggleNewTask() {
    this.showNewTask = !this.showNewTask;
    this.showAllTasks = false; // Hide the task list if it was shown
  }

  toggleViewAllTasks() {
    this.showAllTasks = !this.showAllTasks;
    this.showNewTask = false; // Hide the new task form if it was shown
    this.viewAllTasks(); // Fetch and display tasks when the button is clicked
  }

  onSubmit() {
    // Call the service to get the last login user
    this.addTaskService.getLastLoginUser().subscribe(
        (username) => {  // username is now a string
            this.newTask.Username = username; // Set the username in the task object

            // Call the service to add the task
            this.addTaskService.addTask(this.newTask).subscribe(
                (response) => {
                    console.log('Task added successfully', response);
                    // Clear the form after successful submission
                    this.newTask = { Title: '', Description: '', DueDate: '', Priority: 'Low', Status: 'Planned', Username: '' };  
                    this.viewAllTasks(); // Refresh the task list after adding
                },
                (error) => {
                    console.error('Error adding task', error);
                    alert('There was an error adding the task. Please try again.');
                }
            );
        },
        (error) => {
            console.error('Error fetching last login user', error);
            alert('Could not fetch last login user. Please log in again.');
        }
    );
}



  viewAllTasks() {
    this.addTaskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;  // Store the retrieved tasks
        console.log('Tasks fetched successfully', this.tasks);
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  updateTaskStatus(taskId: number, newStatus: string) {
    console.log(`Updating task ID ${taskId} to status ${newStatus}`);
    this.addTaskService.updateTaskStatus(taskId, newStatus).subscribe(
      (response) => {
        console.log('Task status updated successfully', response);
        this.viewAllTasks(); 
        alert('Task status updated successfully');
      },
      (error) => {
        console.error('Error updating task status', error);
        alert('Error updating task status');
      }
    );
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.addTaskService.deleteTask(taskId).subscribe(
        (response) => {
          console.log('Task deleted successfully', response);
          this.viewAllTasks(); 
        },
        (error) => {
          console.error('Error deleting task', error);
        }
      );
    }
  }
}
