import { Quote } from '../data/quote.interface';

export class QuotesService {
  private favoritedQuotes: Quote[] = [];

  addQuoteToFavorite(quote: Quote) {
    this.favoritedQuotes.push(quote);
  }

  removeQuoteFromFavorite(quote: Quote) {
    const position = this.favoritedQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });

    this.favoritedQuotes.splice(position, 1);
  }

  getFavoritesQuotes() {
    return this.favoritedQuotes.slice();
  }

  isQuoteFavorite(quote: Quote) {
    return this.favoritedQuotes.find((quoteEl: Quote) => {
      return quote.id == quoteEl.id;
    });
  }
}
