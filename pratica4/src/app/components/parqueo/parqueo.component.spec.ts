import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueoComponent } from './parqueo.component';

describe('ParqueoComponent', () => {
  let component: ParqueoComponent;
  let fixture: ComponentFixture<ParqueoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParqueoComponent]
    });
    fixture = TestBed.createComponent(ParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
