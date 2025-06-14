import { Routes } from '@angular/router';
import {FormsPatrimonioComponent} from "./pages/patrimonio/forms-patrimonio/forms-patrimonio.component";
import {HomeComponent} from "./pages/home/home.component";
import {ListPatrimonioComponent} from "./pages/patrimonio/list-patrimonio/list-patrimonio.component";
import {ResponsavelFormComponent} from "./pages/responsavel/responsavel-form/responsavel-form.component";
import {ResponsavelListComponent} from "./pages/responsavel/responsavel-list/responsavel-list.component";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forms-patrimonio', component: FormsPatrimonioComponent },
  { path: 'list-patrimonio', component: ListPatrimonioComponent },
  { path: 'forms-patrimonio/:codigo', component: FormsPatrimonioComponent },
  { path: 'responsavel-form', component: ResponsavelFormComponent },
  { path: 'responsavel-list', component: ResponsavelListComponent },
  { path: 'responsavel-form/:id', component: ResponsavelFormComponent },

];
