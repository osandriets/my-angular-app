import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailsComponent } from './hero-details.component';

describe('ItemDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailsComponent],
    });
    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});