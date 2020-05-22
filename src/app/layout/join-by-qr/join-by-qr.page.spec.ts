import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinByQRPage } from './join-by-qr.page';

describe('JoinByQRPage', () => {
  let component: JoinByQRPage;
  let fixture: ComponentFixture<JoinByQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinByQRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinByQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
