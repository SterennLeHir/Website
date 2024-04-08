import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsPageComponent } from './associations-page.component';

describe('AssociationsListComponent', () => {
  let component: AssociationsPageComponent;
  let fixture: ComponentFixture<AssociationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
