import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NopagecomponentComponent } from './nopagecomponent.component';

describe('NopagecomponentComponent', () => {
  let component: NopagecomponentComponent;
  let fixture: ComponentFixture<NopagecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NopagecomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NopagecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
