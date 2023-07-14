import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import axios from 'axios'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
