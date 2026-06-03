import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemblanzaComponent } from './semblanza';

describe('SemblanzaComponent', () => {
  let component: SemblanzaComponent;
  let fixture: ComponentFixture<SemblanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemblanzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemblanzaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
