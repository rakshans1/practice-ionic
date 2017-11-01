import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";

/**
 * Generated class for the QuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-quote",
  templateUrl: "quote.html"
})
export class QuotePage {
  person: String;
  text: string;
  id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private quotesService: QuotesService) {}

  ionViewDidLoad() {
    this.person = this.navParams.get('person');
    this.text = this.navParams.get('text');
  }

  onClose(remove = false) {
    this.viewCtrl.dismiss(remove);
  }

}
