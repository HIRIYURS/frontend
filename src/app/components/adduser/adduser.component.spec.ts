import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, 
         MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, 
         MatTableModule, MatDividerModule, MatSnackBarModule, MatAutocompleteModule,
         MatNativeDateModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AdduserComponent } from './adduser.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

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
        AdduserComponent,
        ViewuserComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
