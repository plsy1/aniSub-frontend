import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section>
      <router-outlet></router-outlet>
    </section>
  `,
})
export class AppComponent {}
