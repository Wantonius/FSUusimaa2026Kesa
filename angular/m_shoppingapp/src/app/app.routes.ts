import { Routes } from '@angular/router';
import {LoginPage} from './components/loginpage.component';
import {ShoppingForm} from './components/shoppingform.component';
import {ShoppingList} from './components/shoppinglist.component';

export const routes: Routes = [
	{path:"",component:LoginPage},
	{path:"list",component:ShoppingList},
	{path:"form",component:ShoppingForm}
];
