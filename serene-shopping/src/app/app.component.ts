import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
declare function initCarousel(): void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./home.css','./carousel.css']
})
export class AppComponent {
  title = 'serene-shopping';
  
  

ngAfterViewInit(): void {
  initCarousel();
}


}
