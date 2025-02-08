import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CoursesComponent } from './features/courses/courses.component';
import { ContactComponent } from './features/contact/contact.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
