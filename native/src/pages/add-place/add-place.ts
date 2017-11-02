import { PlacesService } from './../../services/places';
import { Location } from "./../../models/location";
import { SetLocationPage } from "./../set-location/set-location";
import { ModalController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;

@IonicPage()
@Component({
  selector: "page-add-place",
  templateUrl: "add-place.html"
})
export class AddPlacePage {
  location: Location = {
    lat: 19.1979894,
    lng: 72.9481736
  }
  locationIsSet = false;
  imageUrl = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddPlacePage");
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 19.1979894,
      lng: 72.9481736
    };
    this.locationIsSet = false;
    this.imageUrl = '';
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      location: this.location
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate(){
    const loader = this.loadingCtrl.create({
      content: 'Getting Your Location..'
    });
    loader.present();
    this.geolocation.getCurrentPosition({enableHighAccuracy: true})
    .then((resp) => {
      this.location = new Location(resp.coords.latitude, resp.coords.longitude);
      this.locationIsSet = true;
      loader.dismiss();
     }).catch((error) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Could get your location.',
          duration: 2500
        });
        toast.present();
       console.log('Error getting location', error);
     });
  }

  onTakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      // destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
    .then((imageData) => {
      const fileName = imageData.replace(/^.*[\\\/]/, '');
      const path = imageData.replace(/[^\/]*$/, '');
      // this.file.moveFile(path, fileName, cordova.file.dataDirectory, fileName)
      // .then(data => {
      //   this.imageUrl = data.nativeURL;
      //   this.camera.cleanup();
      // })
      // .catch(err => {
      //   this.imageUrl = '';
      //   this.camera.cleanup();
      // })
      this.imageUrl = imageData;
    })
    .then( err => {
      this.camera.cleanup();
    })
  }
}
