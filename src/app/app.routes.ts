import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';
import { SigninComponent } from './signin/signin.component';


export const routes: Routes = [
    { path : '', component: SigninComponent},
    { path : 'home', component: HomeComponent},
    { path : 'task', component: TaskComponent},
    { path : 'user', component: UserComponent},
    { path : 'history', component: HistoryComponent},
    { path : 'signin', component: SigninComponent},



];

