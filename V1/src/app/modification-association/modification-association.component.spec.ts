import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationAssociationComponent } from './modification-association.component';

describe('ModificationAssociationComponent', () => {
  let component: ModificationAssociationComponent;
  let fixture: ComponentFixture<ModificationAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationAssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
