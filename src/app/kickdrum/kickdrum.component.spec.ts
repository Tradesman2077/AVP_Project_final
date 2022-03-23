import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickdrumComponent } from './kickdrum.component';

describe('KickdrumComponent', () => {
  let component: KickdrumComponent;
  let fixture: ComponentFixture<KickdrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickdrumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KickdrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
