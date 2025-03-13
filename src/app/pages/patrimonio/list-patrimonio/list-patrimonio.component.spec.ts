import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatrimonioComponent } from './list-patrimonio.component';

describe('ListPatrimonioComponent', () => {
  let component: ListPatrimonioComponent;
  let fixture: ComponentFixture<ListPatrimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPatrimonioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
