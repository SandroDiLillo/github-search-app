import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Loader } from './_core/loader/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'github-search-page';
}
