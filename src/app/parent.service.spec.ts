import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ParentService } from './parent.service';

describe('ParentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    providers: [ HttpClient ]
  }));

  it('should be created', () => {
    const service: ParentService = TestBed.get(ParentService);
    expect(service).toBeTruthy();
  });
});
