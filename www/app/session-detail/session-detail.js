import {NavParams, Page} from 'ionic/ionic';

@Page({
  templateUrl: 'app/session-detail/session-detail.html',
})
export class SessionDetailPage {
  constructor(navParams: NavParams) {
    this.navParams = navParams;
    this.session = this.navParams.data;
  }
}
