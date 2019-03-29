import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule, MatNativeDateModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ViewtaskComponent } from './components/viewtask/viewtask.component';
import { EdittaskComponent } from './components/edittask/edittask.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { EditprojectComponent } from './components/editproject/editproject.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { ViewprojectComponent } from './components/viewproject/viewproject.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AddprojectComponent } from './components/addproject/addproject.component';

import { UserService } from './user.service';
import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { ParentService } from './parent.service';

const routes: Routes = [
  { path: 'addtask', component: AddtaskComponent},
  { path: 'edittask/:id', component: EdittaskComponent},
  { path: 'viewtask', component: ViewtaskComponent},
  { path: 'addproject', component: AddprojectComponent},
  { path: 'editproject/:id', component: EditprojectComponent},
  { path: 'viewproject', component: ViewprojectComponent},
  { path: 'adduser', component: AdduserComponent},
  { path: 'edituser/:id', component: EdituserComponent},
  { path: 'viewuser', component: ViewuserComponent},
  { path: '', redirectTo: 'viewproject', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    EdittaskComponent,
    EdituserComponent,
    EditprojectComponent,
    ViewuserComponent,
    ViewprojectComponent,
    AdduserComponent,
    AddprojectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    MatSliderModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule    
  ],
  providers: [
    TaskService,
    ProjectService,
    UserService,
    ParentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
