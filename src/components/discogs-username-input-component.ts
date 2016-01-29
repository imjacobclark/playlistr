import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Record} from '../models/record-model';
import {User} from '../models/user-model';

import {RecordsService} from '../services/records-service';
import {UserService} from '../services/user-service';

import 'rxjs/add/operator/map';

@Component({
    selector: 'discogs-username-input-component',
    template: `
        <form (submit)="onSubmit()">
            <label for="username">Enter your Discogs username:</label>
            <input type="text" placeholder="username" name="username" [(ngModel)]="user.username">
        </form>
    `
})
export class DiscogsUsernameInputComponent {
    public singles: Array<Record> = [];
    public user: User = new User();

    constructor(
        public http: Http, 
        public recordsService: RecordsService, 
        public userService: UserService
    ) {}

    onSubmit(){
        let result: Object = {};

        this.userService.user = this.user;
        
        this.http
            .get(
                'https://api.discogs.com/users/' + this.user.username + '/collection/folders/0/releases'
            )
            .map(
                record => JSON.parse(record['_body']).releases.map(
                    release => new Record(release)
                )
            )
            .subscribe(
                data => data.forEach(record => this.recordsService.allRecords.push(record)),
                err => console.log(err),
                () => this.recordsService.filterSingles()
            );
    }
}
