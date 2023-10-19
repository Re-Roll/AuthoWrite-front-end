import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatBarComponent } from './stat-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('StatBarComponent', () => {
  let component: StatBarComponent;
  let fixture: ComponentFixture<StatBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatBarComponent],
      imports: [NgbModule],
    });
    fixture = TestBed.createComponent(StatBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
