import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, 
         MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, 
         MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule,
         MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AddtaskComponent } from './addtask.component';
import { ViewtaskComponent } from '../viewtask/viewtask.component';

import { TaskService } from '../../task.service';
import { ParentService } from '../../parent.service';
import { ProjectService } from '../../project.service';
import { UserService } from '../../user.service';

const routes: Routes = [
  { path: 'addtask', component: AddtaskComponent},
  { path: 'viewtask', component: ViewtaskComponent},
  { path: '', redirectTo: 'viewtask', pathMatch: 'full'}
];

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
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
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule     
      ],
      declarations: [ 
        AddtaskComponent,
        ViewtaskComponent
      ],
      providers: [ 
        ParentService,
        TaskService,
        ProjectService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
