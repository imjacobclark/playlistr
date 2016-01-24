import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Record} from '../models/record';
import {RecordsService} from '../services/records-service';

import 'rxjs/add/operator/map';

@Component({
    selector: 'playlistr',
    template: `
        <h1>Playlistr</h1>
        <ul>
            <li *ngFor="#record of recordsService.records">
                {{record.recordTitle}}
                -
                <strong>{{record.recordArtist}}</strong>
            </li>
        </ul>
        <p>&copy; Playlistr</p>
    `,
})
export class AppComponent {
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
                () => console.log(this.recordsService)
            );
    }
}
