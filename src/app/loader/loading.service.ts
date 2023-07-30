import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingSrvice {
  loading = signal(true);

  setLoading(loading: boolean) {
    this.loading.set(loading);
  }
}
