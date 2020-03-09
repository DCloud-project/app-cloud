import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'common-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public tab="tab1";
  constructor() { }

  ngOnInit() {
  }

}
