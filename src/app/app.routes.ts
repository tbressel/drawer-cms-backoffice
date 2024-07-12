import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './backoffice/login/login.component';
import { LogoutComponent } from './backoffice/logout/logout.component';
import { HomeComponent } from './backoffice/home/home.component';
import { MenuSettingComponent } from './backoffice/menu-setting/menu-setting.component';
import { AllArticlesComponent } from './backoffice/all-articles/all-articles.component';
import { CreateArticleComponent } from './backoffice/create-article/create-article.component';
import { EditArticleComponent } from './backoffice/edit-article/edit-article.component';
import { DiskUnitsSettingComponent } from './backoffice/disk-units-setting/disk-units-setting.component';
import { UnitFilesSettingComponent } from './backoffice/unit-files-setting/unit-files-setting.component';
import { AllUsersComponent } from './backoffice/all-users/all-users.component';
import { AllCertificatesComponent } from './backoffice/all-certificates/all-certificates.component';
import { PermissionsService } from './services/permissions.service'

export const routes: Routes = [
    { path: './', component: AppComponent},
    { path: 'accueil', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'menu-setting', component: MenuSettingComponent, canActivate: [PermissionsService]},
    { path: 'all-articles', component: AllArticlesComponent, canActivate: [PermissionsService]},
    { path: 'create-article', component: CreateArticleComponent, canActivate: [PermissionsService]},
    { path: 'edit-article/:id/:page', component: EditArticleComponent, canActivate: [PermissionsService]},
    { path: 'disk-units-setting', component: DiskUnitsSettingComponent, canActivate: [PermissionsService]},
    { path: 'unit-files-setting', component: UnitFilesSettingComponent, canActivate: [PermissionsService]},
    { path: 'all-users', component: AllUsersComponent, canActivate: [PermissionsService]},
    { path: 'all-certificates', component: AllCertificatesComponent, canActivate: [PermissionsService]}

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
    export class AppRoutingModule { }  