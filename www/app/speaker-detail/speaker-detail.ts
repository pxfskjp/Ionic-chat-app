import {NavController, NavParams, Page} from 'ionic-framework/ionic';
import {SessionDetailPage} from '../session-detail/session-detail';


@Page({
  templateUrl: 'app/speaker-detail/speaker-detail.html',
})
export class SpeakerDetailPage {
  nav: any;
  navParams: any;
  speaker: any;

  constructor(nav: NavController, navParams: NavParams) {
    this.nav = nav;
    this.navParams = navParams;
    this.speaker = this.navParams.data;
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }
}
