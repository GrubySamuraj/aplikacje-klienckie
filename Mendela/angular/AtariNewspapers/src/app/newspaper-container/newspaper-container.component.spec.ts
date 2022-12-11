import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspaperContainerComponent } from './newspaper-container.component';

describe('NewspaperContainerComponent', () => {
  let component: NewspaperContainerComponent;
  let fixture: ComponentFixture<NewspaperContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewspaperContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewspaperContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
