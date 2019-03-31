import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, 
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, 
  MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule,
  MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ViewprojectComponent } from './viewproject.component';

describe('ViewprojectComponent', () => {
  let component: ViewprojectComponent;
  let fixture: ComponentFixture<ViewprojectComponent>;

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
      declarations: [ ViewprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
