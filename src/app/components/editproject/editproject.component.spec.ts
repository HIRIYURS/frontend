import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, 
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, 
  MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule,
  MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { EditprojectComponent } from './editproject.component';
import { ViewprojectComponent } from '../viewproject/viewproject.component';

describe('EditprojectComponent', () => {
  let component: EditprojectComponent;
  let fixture: ComponentFixture<EditprojectComponent>;

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
      declarations: [ 
        EditprojectComponent,
        ViewprojectComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
