import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPatrimonioComponent } from './forms-patrimonio.component';

describe('FormsPatrimonioComponent', () => {
  let component: FormsPatrimonioComponent;
  let fixture: ComponentFixture<FormsPatrimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsPatrimonioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsPatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
