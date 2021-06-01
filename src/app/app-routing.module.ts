import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { PostItemComponent } from './post/post-item/post-item.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home', component: PostListComponent},
  {path: 'posts/:id', component: PostItemComponent},
  {path: 'form', component: PostFormComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
