import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FillInforPage } from './fill-infor.page';

describe('FillInforPage', () => {
  let component: FillInforPage;
  let fixture: ComponentFixture<FillInforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillInforPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FillInforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
