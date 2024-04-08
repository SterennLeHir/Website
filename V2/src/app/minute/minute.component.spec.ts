import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteComponent } from './minute.component';

describe('MinuteComponent', () => {
  let component: MinuteComponent;
  let fixture: ComponentFixture<MinuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinuteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
