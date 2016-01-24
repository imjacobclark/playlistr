import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './components/app-component'
import {RecordsService} from './services/records-service';

enableProdMode();

bootstrap(AppComponent, [HTTP_PROVIDERS, RecordsService]);
