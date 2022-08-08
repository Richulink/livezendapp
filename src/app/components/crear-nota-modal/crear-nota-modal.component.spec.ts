import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNotaModalComponent } from './crear-nota-modal.component';

describe('CrearNotaModalComponent', () => {
  let component: CrearNotaModalComponent;
  let fixture: ComponentFixture<CrearNotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNotaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNotaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
