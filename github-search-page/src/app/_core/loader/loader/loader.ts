import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinner, CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css'
})
export class Loader {
constructor(private loaderService: LoaderService) { }
  isLoading = false;

  ngOnInit() {
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

}
