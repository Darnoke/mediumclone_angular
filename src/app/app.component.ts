import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './shared/components/topBar/topBar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TopBar],
})
export class AppComponent {
  title = 'mediumclone_angular';
}
