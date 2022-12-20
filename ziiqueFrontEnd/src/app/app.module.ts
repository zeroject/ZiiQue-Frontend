import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
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
import { MatDialogModule } from '@angular/material/dialog';
import { SaveBeatPageComponent } from './beat-maker-page/save-beat-page/save-beat-page.component';
import { DeleteProfilePopupComponent } from './beat-maker-page/delete-profile-popup/delete-profile-popup.component';
import { UpdateUserPageComponent } from './beat-maker-page/update-user-page/update-user-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: 'Login', component: LoginPageComponent },
  { path: 'BeatMaker', component: BeatMakerPageComponent, canActivate: [AuthguardService] },
  { path: '**', redirectTo:'Login'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    BeatMakerPageComponent,
    SaveBeatPageComponent,
    DeleteProfilePopupComponent,
    UpdateUserPageComponent
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
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
