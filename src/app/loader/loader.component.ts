import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { interval, take } from 'rxjs';
import { ImageSrvice } from '../images/image.service';
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
    interval(1500)
      .pipe(take(1))
      .subscribe(() => this.loadingSrvice.setLoading(false));
  }
}
