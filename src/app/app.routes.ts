import { Routes } from '@angular/router';
import {FormsPatrimonioComponent} from "./pages/patrimonio/forms-patrimonio/forms-patrimonio.component";
import {HomeComponent} from "./pages/home/home.component";
import {ListPatrimonioComponent} from "./pages/patrimonio/list-patrimonio/list-patrimonio.component";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'forms-patrimonio', component: FormsPatrimonioComponent },
  { path: 'list-patrimonio', component: ListPatrimonioComponent },
  { path: 'forms-patrimonio/:id', component: FormsPatrimonioComponent },
];
