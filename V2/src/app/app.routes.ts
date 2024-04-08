import { Routes } from '@angular/router';
import {UsersPageComponent} from "./users-page/users-page.component";
import {LoginComponent} from "./login/login.component";
import {authGuard} from './guards/auth.guard'
import {AssociationsPageComponent} from "./associations-page/associations-page.component";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {UserDetailItemComponent} from "./user-detail-item/user-detail-item.component";
import {ModificationInfosComponent} from "./modification-infos/modification-infos.component";
import {RegisterComponent} from "./register/register.component";
import {AssociationDetailItemComponent, Minute} from "./association-detail-item/association-detail-item.component";
import {ModificationAssociationComponent} from "./modification-association/modification-association.component";
import {ModificationPasswordComponent} from "./modification-password/modification-password.component";
import {CreationAssociationComponent} from "./creation-association/creation-association.component";
import {MinuteComponent} from "./minute/minute.component";
import {ModificationMembresComponent} from "./modification-membres/modification-membres.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {path: 'users', component: UsersPageComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'associations', component:AssociationsPageComponent, canActivate:[authGuard]},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]},
  {path: 'account', component:AccountComponent, canActivate:[authGuard]},
  {path: 'users/:id', component:UserDetailItemComponent, canActivate:[authGuard]},
  {path: 'associations/:id', component:AssociationDetailItemComponent, canActivate:[authGuard]},
  {path: 'minute/:id', component: MinuteComponent, canActivate: [authGuard]},
  {path: 'modifier-mes-informations', component:ModificationInfosComponent, canActivate:[authGuard]},
  {path: 'modifier-association/:id', component:ModificationAssociationComponent, canActivate:[authGuard]},
  {path: 'modifier-membres/:id', component: ModificationMembresComponent, canActivate:[authGuard]},
  {path: 'modifier-mot-de-passe', component:ModificationPasswordComponent, canActivate:[authGuard]},
  {path: 'creer-association', component:CreationAssociationComponent, canActivate:[authGuard]},
  {path: '', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent},

];
