import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Record} from '../models/record-model';
import {User} from '../models/user-model';

import {RecordsService} from '../services/records-service';
import {UserService} from '../services/user-service';

import {RecordItemRenderer} from '../renderers/record-item-renderer';

import 'rxjs/add/operator/map';

@Component({
    selector: 'playlistr',
    directives: [RecordItemRenderer],
    template: `
        <form (submit)="onSubmit()">
            <label for="username">Enter your Discogs username:</label>
            <input type="text" placeholder="username" name="username" [(ngModel)]="user.username">
        </form>

        <ul *ngIf="user.username !== ''">
            <li *ngFor="#record of recordsService.singles">
                <record-item-renderer [record]="record"></record-item-renderer>
            </li>
        </ul>
    `
})
export class AppComponent {
    public singles: Array<Record> = [];
    public user: User = new User();

    constructor(public http: Http, public recordsService: RecordsService) {}

    onSubmit(){
        let result: Object = {};

        this.recordsService.singles = [];

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
                () => this.filterSingles(this.recordsService.allRecords)
            );
    }

    filterSingles(records: Array<Record>): void{
        let sizeOfCollection = records.length,
            recordsInPlaylist = [],
            i = 0;

        while(i <= 4){
            let selectedRecord = Math.floor(Math.random() * sizeOfCollection) + 0;

            if(recordsInPlaylist.indexOf(selectedRecord) === -1){
                if(records[selectedRecord].isSingle === true){
                    this.recordsService.singles.push(records[selectedRecord]);
                    recordsInPlaylist.push(selectedRecord);
                    i++;
                }
            }
        }
    }
}
