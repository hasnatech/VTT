import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VttComponent } from './vtt.component';

describe('VttComponent', () => {
  let component: VttComponent;
  let fixture: ComponentFixture<VttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
