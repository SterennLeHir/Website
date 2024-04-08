import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationAssociationComponent } from './creation-association.component';

describe('CreationAssociationComponent', () => {
  let component: CreationAssociationComponent;
  let fixture: ComponentFixture<CreationAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationAssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
