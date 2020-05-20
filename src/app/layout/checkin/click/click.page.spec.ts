import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClickPage } from './click.page';

describe('ClickPage', () => {
  let component: ClickPage;
  let fixture: ComponentFixture<ClickPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClickPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
