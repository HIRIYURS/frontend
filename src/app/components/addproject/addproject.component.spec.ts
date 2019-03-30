import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, 
         MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, 
         MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule,
         MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';         

import { AddprojectComponent } from './addproject.component';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
      declarations: [ AddprojectComponent ]
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
