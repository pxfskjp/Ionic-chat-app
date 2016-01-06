import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  constructor(nav: NavController) {
    this.nav = nav;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
      this.nav.push(TabsPage);
    }
  }
}
