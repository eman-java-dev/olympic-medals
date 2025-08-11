import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; 

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.js'; // لتفادي تحذير CommonJS
