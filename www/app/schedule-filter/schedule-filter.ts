import {Page, NavParams} from 'ionic-framework/ionic';
import {ConferenceData} from '../providers/conference-data';


@Page({
  templateUrl: 'app/schedule-filter/schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks = [];
  close: any;
  confData: any;
  navParams: any;
  filteredTracks: any;

  constructor(confData: ConferenceData, navParams: NavParams) {
    this.navParams = navParams;
    this.confData = confData;

    // passed in array of tracks that should be excluded (unchecked)
    let excludeTracks = this.navParams.data;

    this.confData.getTracks().then(trackNames => {

      trackNames.forEach(trackName => {
        this.tracks.push({
          name: trackName,
          isChecked: (excludeTracks.indexOf(trackName) === -1)
        });
      });

    });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeTracks = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.close(excludeTracks);
  }
}
