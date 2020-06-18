import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCheckinPage } from './student-checkin.page';

describe('StudentCheckinPage', () => {
  let component: StudentCheckinPage;
  let fixture: ComponentFixture<StudentCheckinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCheckinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCheckinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
