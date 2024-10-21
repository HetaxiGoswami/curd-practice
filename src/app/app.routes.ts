import { Routes } from '@angular/router';
import { FigmaComponent } from './components/figma/figma.component';
import { CurdComponent } from './components/curd/curd.component';

export const routes: Routes = [
    {
        path:'',
        component:FigmaComponent
    },
    {
        path:'curd',
        component:CurdComponent
    }
];
