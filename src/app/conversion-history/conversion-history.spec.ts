import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionHistory } from './conversion-history';

describe('ConversionHistory', () => {
  let component: ConversionHistory;
  let fixture: ComponentFixture<ConversionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
