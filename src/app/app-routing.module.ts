import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { TableComponent } from './components/table/table.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-form', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent },
  { path: 'table', component: TableComponent },
  { path: 'bar-chart', component: BarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
