import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckinResultPage } from './checkin-result.page';

describe('CheckinResultPage', () => {
  let component: CheckinResultPage;
  let fixture: ComponentFixture<CheckinResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckinResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
