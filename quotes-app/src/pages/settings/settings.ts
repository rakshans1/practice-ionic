import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle } from 'ionic-angular';
import { SettingsService } from '../../services/settings';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private settingsService: SettingsService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onToggle(toggle: Toggle) {
    this.settingsService.setAltBackground(toggle.checked);
  }

  checkAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
