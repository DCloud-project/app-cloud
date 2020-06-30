import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindByEmailPage } from './find-by-email.page';

describe('FindByEmailPage', () => {
  let component: FindByEmailPage;
  let fixture: ComponentFixture<FindByEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindByEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindByEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
