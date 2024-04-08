import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationMembresComponent } from './modification-membres.component';

describe('ModificationMembresComponent', () => {
  let component: ModificationMembresComponent;
  let fixture: ComponentFixture<ModificationMembresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationMembresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
