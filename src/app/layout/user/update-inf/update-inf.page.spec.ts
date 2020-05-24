import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateInfPage } from './update-inf.page';

describe('UpdateInfPage', () => {
  let component: UpdateInfPage;
  let fixture: ComponentFixture<UpdateInfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
