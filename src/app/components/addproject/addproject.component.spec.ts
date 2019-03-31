import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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


import { AddprojectComponent } from './addproject.component';
import { ViewprojectComponent } from '../viewproject/viewproject.component';

const routes: Routes = [
  { path: 'addproject', component: AddprojectComponent},
  { path: 'viewproject', component: ViewprojectComponent},
  { path: '', redirectTo: 'viewproject', pathMatch: 'full'}
];

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        AddprojectComponent,
        ViewprojectComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
