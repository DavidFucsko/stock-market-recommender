import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksPageComponent } from './stocks-page.component';

const routes: Routes = [{
    path: '',
    component: StocksPageComponent
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StocksPageRoutingModule {
}
