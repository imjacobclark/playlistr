import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'playlistr',
    template: `
        <h1>Playlistr</h1>
        <ul>
            <li *ngFor="#release of releases">
                {{release.basic_information.title}}
            </li>
        </ul>
    `,
})
export class AppComponent {
    result: Object;
    releases: Array;

    constructor(http: Http) {
        this.result = {};
        http
            .get(
                'https://api.discogs.com/users/imjacobclark/collection/folders/0/releases'
            )
            .subscribe(
                data => this.result = JSON.parse(data.text()),
                err => this.logError(err.text()),
                () => this.gotRecords(this.result)
            );
    }

    gotRecords(records){
        this.releases = records.releases;
    }

}
