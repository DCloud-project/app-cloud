import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MylessonPage } from './mylesson.page';

describe('MylessonPage', () => {
  let component: MylessonPage;
  let fixture: ComponentFixture<MylessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MylessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
