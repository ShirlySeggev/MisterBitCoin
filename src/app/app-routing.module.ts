import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  {
    path: 'contacts', component: ContactPageComponent, children: [
      { path: 'edit', component: ContactEditComponent },
    ]
  },
  {
    path: 'contacts/:id', component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService },
    children: [
      {
        path: 'edit', component: ContactEditComponent,
        resolve: { contact: ContactResolverService },
      },
    ]
  },
  { path: 'signup', component: SignupPageComponent },
  { path: 'statistics', component: StatisticPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
