import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CompareComponent } from './compare.component';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompareComponent],
      declarations: [CompareComponent]
    });
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    const service: CompareComponent = TestBed.get(CompareComponent);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const service: CompareComponent = TestBed.get(CompareComponent);
    expect(service.sendPostRequest).toBeTruthy();
  });

});
