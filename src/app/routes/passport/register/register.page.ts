import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public register_email:string='';

  constructor(public router:Router) { }

  ngOnInit() {
  }
  onRegister(form : NgForm){
    if(form.valid){
      this.router.navigateByUrl(`/verify/${this.register_email}`);
      localStorage.setItem("isLogin","false");
    }
  }

}
