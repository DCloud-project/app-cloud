import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonTabsPage } from './lesson-tabs.page';

describe('LessonTabsPage', () => {
  let component: LessonTabsPage;
  let fixture: ComponentFixture<LessonTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
