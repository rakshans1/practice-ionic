import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular";
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";
import { QuotePage } from "../quote/quote";
import { SettingsService } from "../../services/settings";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quotesService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoritesQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    })
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
    const position = this.quotes.findIndex((quoteEl) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altquoteBackground' : 'quoteBackground';
  }
}
