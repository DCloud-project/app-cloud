import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestureLockPage } from './gesture-lock.page';

describe('GestureLockPage', () => {
  let component: GestureLockPage;
  let fixture: ComponentFixture<GestureLockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestureLockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestureLockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
