import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClapsnareComponent } from './clapsnare.component';

describe('ClapsnareComponent', () => {
  let component: ClapsnareComponent;
  let fixture: ComponentFixture<ClapsnareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClapsnareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClapsnareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
