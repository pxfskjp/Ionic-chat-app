import {NavController, Page} from 'ionic/ionic';
import {DataService} from '../service/data';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';

@Page({
  templateUrl: 'app/speakers/speakers.html',
  providers: [DataService]
})
export class SpeakersPage {
  constructor(nav: NavController, data: DataService) {
    this.nav = nav;
    this.speakers = null;
    this.scheduleInfo = null;
    this.dataService = data;
  }

  onInit() {
    this.scheduleInfo = this.dataService.getSchedule();
    let speakerList = this.speakers = this.dataService.getSpeakers();
    let talks = [];
    let speakers = [];

    this.scheduleInfo.map(dayItem => {
      dayItem.sessions.map(sessionItem => {
        sessionItem.talks.map(talkItem => {
          talks.push(talkItem.name);

          if (talkItem.speaker) {
            let speakerSession = speakerList.find(x => x.name == talkItem.speaker);
            if (speakerSession) {
              speakerSession.sessions = speakerSession.sessions || [];
              speakerSession.sessions.push(talkItem);
            }
            if (speakers.indexOf(talkItem.speaker) == -1) {
              speakers.push(talkItem.speaker);
            }
          }
          
        });
      });
    });

    this.talks = talks;
    this.speakersNames = speakers;
  }

  openSession(session) {
    this.nav.push(SessionDetailPage, session);
  }

  openSpeakerDetail(speakerName) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  openSpeakerTwitter(speaker) {
    window.open(speaker.twitter);
  }
}
