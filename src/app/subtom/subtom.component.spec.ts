import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtomComponent } from './subtom.component';

describe('SubtomComponent', () => {
  let component: SubtomComponent;
  let fixture: ComponentFixture<SubtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
