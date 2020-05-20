import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatelessonPage } from './createlesson.page';

describe('CreatelessonPage', () => {
  let component: CreatelessonPage;
  let fixture: ComponentFixture<CreatelessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatelessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
