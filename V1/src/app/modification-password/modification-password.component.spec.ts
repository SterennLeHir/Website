import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPasswordComponent } from './modification-password.component';

describe('ModificationPasswordComponent', () => {
  let component: ModificationPasswordComponent;
  let fixture: ComponentFixture<ModificationPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
