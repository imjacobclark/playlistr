import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {DiscogsUsernameInputComponent} from './discogs-username-input-component';

import {Record} from '../models/record-model';
import {User} from '../models/user-model';

import {RecordsService} from '../services/records-service';
import {UserService} from '../services/user-service';

import {RecordItemRenderer} from '../renderers/record-item-renderer';

import 'rxjs/add/operator/map';

@Component({
    selector: 'playlistr',
    directives: [RecordItemRenderer, DiscogsUsernameInputComponent],
    template: `
        <discogs-username-input-component></discogs-username-input-component>
       
        <div class="section" style="background-color: rgba(0, 0, 0, 0.5); " *ngIf="userService.user.username !== ''">
            <div class="container">
                <div class="row" *ngFor="#record of recordsService.singles">
                    <record-item-renderer [record]="record"></record-item-renderer>
                    
                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppComponent {
    public singles: Array<Record> = [];
    public user: User = new User();

    constructor(
        public http: Http, 
        public recordsService: RecordsService, 
        public userService: UserService
    ) {}
}
