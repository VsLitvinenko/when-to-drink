import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiUrlInterceptor, authInterceptor, errorsHandleInterceptor } from './app/core/interceptors';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideConfirmService } from './app/core/confirm';
import { inject, provideAppInitializer } from '@angular/core';
import { TelegramService } from './app/core/services';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';


registerLocaleData(localeRu);

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    provideAnimations(),
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([
        apiUrlInterceptor,
        authInterceptor,
        errorsHandleInterceptor,
      ])
    ),
    provideConfirmService(environment.isTelegramMiniApp),
    provideAppInitializer(() => {
      const tg = inject(TelegramService);
      return tg.initApp();
    }),
  ],
});
