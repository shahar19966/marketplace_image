import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { interval, take, timer } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, LottieModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  // loading = true;

  loadingSrvice = inject(LoadingService);

  options: AnimationOptions = {
    path: 'assets/lottie/shop.json',
    autoplay: true,
    loop: true,
  };

  ngOnInit() {
    timer(1500).subscribe(() => this.loadingSrvice.setLoading(false));
  }
}
