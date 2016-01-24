import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Record} from '../models/record-model';
import {RecordsService} from '../services/records-service';

import 'rxjs/add/operator/map';

@Component({
    selector: 'playlistr',
    template: `
        <h1>Playlistr</h1>
        <p>Here is your playlist!</p>
        <ul>
            <li *ngFor="#record of singles">
                {{record.recordTitle}}
                -
                <strong>{{record.recordArtist}}</strong>
            </li>
        </ul>
        <p>&copy; Playlistr</p>
    `
})
export class AppComponent {
    public singles: Array<Record> = [];

    constructor(http: Http, public recordsService: RecordsService) {
        let result: Object = {};

        http
            .get(
                'https://api.discogs.com/users/imjacobclark/collection/folders/0/releases'
            )
            .map(
                record => JSON.parse(record['_body']).releases.map(
                    release => new Record(release)
                )
            )
            .subscribe(
                data => data.forEach(record => this.recordsService.records.push(record)),
                err => console.log(err),
                () => this.filterSingles(this.recordsService.records)
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
                    this.singles.push(records[selectedRecord]);
                    recordsInPlaylist.push(selectedRecord);
                    i++;
                }
            }
        }
    }
}
