import { inject, Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastController = inject(ToastController);
  private readonly defaultOptions: ToastOptions = {
    mode: 'ios',
    position: 'bottom',
    swipeGesture: 'vertical',
    duration: 2000,
    animated: true,
  };

  public async success(message: string, icon?: string, options?: ToastOptions): Promise<void> {
    const color = 'success';
    const toastOptions = { ...this.defaultOptions, ...options, color, icon, message };
    return this.toastController.create(toastOptions).then((t) => t.present());
  }

  public async warning(message: string, icon?: string, options?: ToastOptions): Promise<void> {
    const color = 'warning';
    const toastOptions = { ...this.defaultOptions, ...options, color, icon, message };
    return this.toastController.create(toastOptions).then((t) => t.present());
  }

  public async error(message: string, icon?: string, options?: ToastOptions): Promise<void> {
    const color = 'danger';
    const duration = 3500;
    const toastOptions = { ...this.defaultOptions, ...options, color, icon, message, duration };
    return this.toastController.create(toastOptions).then((t) => t.present());
  }

  public async info(message: string, icon?: string, options?: ToastOptions): Promise<void> {
    const color = 'primary';
    const toastOptions = { ...this.defaultOptions, ...options, color, icon, message };
    return this.toastController.create(toastOptions).then((t) => t.present());
  }

  public async light(message: string, icon?: string, options?: ToastOptions): Promise<void> {
    const color = 'light';
    const toastOptions = { ...this.defaultOptions, ...options, color, icon, message };
    return this.toastController.create(toastOptions).then((t) => t.present());
  }
}
