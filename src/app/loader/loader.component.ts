import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, LottieModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  options: AnimationOptions = {
    path: 'assets/lottie/shop.json',
    autoplay: true,
    loop: false,
  };
}
