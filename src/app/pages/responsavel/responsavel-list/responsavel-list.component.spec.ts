import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelListComponent } from './responsavel-list.component';

describe('ResponsavelListComponent', () => {
  let component: ResponsavelListComponent;
  let fixture: ComponentFixture<ResponsavelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsavelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsavelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
