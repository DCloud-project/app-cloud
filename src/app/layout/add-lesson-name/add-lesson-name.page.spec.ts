import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLessonNamePage } from './add-lesson-name.page';

describe('AddLessonNamePage', () => {
  let component: AddLessonNamePage;
  let fixture: ComponentFixture<AddLessonNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLessonNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
