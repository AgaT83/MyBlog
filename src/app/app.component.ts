import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    
    <main>
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'myBlog';
}
