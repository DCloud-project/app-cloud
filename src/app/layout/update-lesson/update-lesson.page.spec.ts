import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateLessonPage } from './update-lesson.page';

describe('UpdateLessonPage', () => {
  let component: UpdateLessonPage;
  let fixture: ComponentFixture<UpdateLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
