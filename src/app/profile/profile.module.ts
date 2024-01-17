import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProfileViewComponent,
    ProfileUpdateComponent
  ]
})
export class ProfileModule { }
