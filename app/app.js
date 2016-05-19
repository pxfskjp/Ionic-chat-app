import {ViewChild} from '@angular/core';
import {App, Events, Platform, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {TutorialPage} from './pages/tutorial/tutorial';


@App({
  templateUrl: 'build/app.html',
  providers: [ConferenceData, UserData],
  // Set any config for your app here, see the docs for
  // more ways to configure your app:
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {
    // Place the tabs on the bottom for all platforms
    // See the theming docs for the default values:
    // http://ionicframework.com/docs/v2/theming/platform-specific-styles/
    tabbarPlacement: "bottom"
  },
  queries: {
    nav: new ViewChild('content')
  }
})
class ConferenceApp {
  static get parameters() {
    return [
      [Events], [ConferenceData], [UserData], [Platform], [MenuController]
    ]
  }

  constructor(events, confData, userData, platform, menu) {
    this.userData = userData;
    this.events = events;
    this.menu = menu;

    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

    // We plan to add auth to only show the login page if not logged in
    this.root = TutorialPage;

    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.appPages = [
      { title: 'Schedule', component: TabsPage, icon: 'calendar' },
      { title: 'Speakers', component: TabsPage, index: 1, icon: 'contacts' },
      { title: 'Map', component: TabsPage, index: 2, icon: 'map' },
      { title: 'About', component: TabsPage, index: 3, icon: 'information-circle' },
    ];

    this.loggedInPages = [
      { title: 'Logout', component: TabsPage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ]

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page) {
    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }
}
