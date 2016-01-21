import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component'
import {enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

enableProdMode();

bootstrap(AppComponent, [HTTP_PROVIDERS]);
