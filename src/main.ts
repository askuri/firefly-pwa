import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Workbox} from 'workbox-window';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function loadServiceWorker(): void {
  if ('serviceWorker' in navigator && environment.production) {
    const wb = new Workbox('/sw.js');
    wb.register();
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then( () => loadServiceWorker())
  .catch(err => console.error(err));
