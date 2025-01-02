import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chat'
    },
    {
        path: 'test',
        component: TestComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'chat',
        component: ChatsComponent,
        canActivate: [authGuard]
        
    }
];
