import { PlacesService } from './../../services/places';
import { Place } from './../../models/place';
import { AddPlacePage } from './../add-place/add-place';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  places: Place[] = [];
  addPlacePage = AddPlacePage
  constructor(public navCtrl: NavController, private placesService: PlacesService) {

  }

  ngOnInit() {
    this.placesService.fetchPlaces()
    .then((places: Place[]) => {
      this.places = places;
    })
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }
}
