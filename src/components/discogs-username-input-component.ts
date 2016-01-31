import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Record} from '../models/record-model';
import {User} from '../models/user-model';

import {RecordsService} from '../services/records-service';
import {UserService} from '../services/user-service';

import {Config} from '../../config';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'discogs-username-input-component',
    template: `
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <form class="form-horizontal input" role="form" (submit)="onSubmit()">
                            <div class="form-group username-input">
                                <div class="col-sm-12">
                                    <input type="text" class="form-control input-lg" id="inputEmail3" placeholder="A Discogs username (e.g: imjacobclark)" [(ngModel)]="user.username">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class DiscogsUsernameInputComponent {
    public singles: Array<Record> = [];
    public user: User = new User();
    private config = new Config();

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
                data => data.forEach(
                    record => {
                         this.http
                            .get(
                                record.resourceUrl + '?key=' + this.config.getConfig().key + '&secret=' + this.config.getConfig().secret + ''
                            )
                            .subscribe(
                                data => {
                                    record.notes = JSON.parse(data['_body']).notes;
                                    record.image = JSON.parse(data['_body']).images[0].uri;
                                    record.recordLabel = JSON.parse(data['_body']).labels[0].name;
                                    record.recordGenre = JSON.parse(data['_body']).genres[0];
                                    record.recordCountry = JSON.parse(data['_body']).country;
                                    record.recordWeight = JSON.parse(data['_body']).estimated_weight
                                },
                                err => console.log(err),
                                () => false
                            );
                        
                        this.recordsService.allRecords.push(record)
                    }
                 ),
                err => console.log(err),
                () => this.recordsService.filterSingles()
            );
    }
}
