import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserPageComponent } from './new-user-page/new-user-page.component';
import { BeatMakerPageComponent } from './beat-maker-page/beat-maker-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {AuthguardService} from "../services/authguard.service";
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


const routes: Routes = [
  { path: 'Profile', component: ProfilePageComponent, canActivate: [AuthguardService]},
  { path: 'Login', component: LoginPageComponent },
  { path: 'NewUser', component: NewUserPageComponent },
  { path: 'BeatMaker', component: BeatMakerPageComponent, canActivate: [AuthguardService]},
  { path: '**', redirectTo:'Login'},
  { path: 'Profile', pathMatch: "prefix", component: ProfilePageComponent, canActivate: [AuthguardService] },
  { path: 'Login', pathMatch: "full", component: LoginPageComponent },
  { path: 'NewUser', pathMatch: "prefix", component: NewUserPageComponent },
  { path: 'BeatMaker', pathMatch: "prefix", component: BeatMakerPageComponent},
  { path: '**', redirectTo:'/BeatMaker', pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    LoginPageComponent,
    NewUserPageComponent,
    BeatMakerPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    RouterOutlet,
    MatCardModule,
    PasswordStrengthMeterModule.forRoot(),
    MatSnackBarModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
