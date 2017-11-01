import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-quotes",
  templateUrl: "quotes.html"
})
export class QuotesPage implements OnInit {
  quoteGroup: { category: string; quotes: Quote[]; icon: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private quotesService: QuotesService
  ) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorite(selectedQuotes: Quote) {
    const alert = this.alertCtrl.create({
      title: "Add Quote",
      subTitle: "Are You Sure",
      message: "Are You Sure you want to add quote?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.quotesService.addQuoteToFavorite(selectedQuotes);
          }
        },
        {
          text: "No",
          role: "cancel",
          handler: () => {}
        }
      ]
    });

    alert.present();
  }

  onremoveToFavorite(quote: Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }
}
