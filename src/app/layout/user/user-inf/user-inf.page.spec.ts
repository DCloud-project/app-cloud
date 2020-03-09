import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserInfPage } from './user-inf.page';

describe('UserInfPage', () => {
  let component: UserInfPage;
  let fixture: ComponentFixture<UserInfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
