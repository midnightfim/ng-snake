import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeHeaderComponent } from './snake-header.component';

describe('SnakeHeaderComponent', () => {
  let component: SnakeHeaderComponent;
  let fixture: ComponentFixture<SnakeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
