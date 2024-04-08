import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationInfosComponent } from './modification-infos.component';

describe('ModificationInfosComponent', () => {
  let component: ModificationInfosComponent;
  let fixture: ComponentFixture<ModificationInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
