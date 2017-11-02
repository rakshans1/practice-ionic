import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthTabPage } from './auth-tab';

@NgModule({
  declarations: [
    AuthTabPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthTabPage),
  ],
})
export class AuthTabPageModule {}
