import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDetailItemComponent } from './association-detail-item.component';

describe('AssociationDetailItemComponent', () => {
  let component: AssociationDetailItemComponent;
  let fixture: ComponentFixture<AssociationDetailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationDetailItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
