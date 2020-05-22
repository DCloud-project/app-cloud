import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinByCodePage } from './join-by-code.page';

describe('JoinByCodePage', () => {
  let component: JoinByCodePage;
  let fixture: ComponentFixture<JoinByCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinByCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinByCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
