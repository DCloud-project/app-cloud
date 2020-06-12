import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonEditPage } from './lesson-edit.page';

describe('LessonEditPage', () => {
  let component: LessonEditPage;
  let fixture: ComponentFixture<LessonEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
