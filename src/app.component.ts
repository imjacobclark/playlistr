import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'playlistr',
    template: `
        <h1>Playlistr</h1>
        <ul>
            <li *ngFor="#release of releases" >
                {{release.basic_information.title}}
                -
                <strong>{{release.basic_information.artists[0].name}}</strong>
            </li>
        </ul>
        <p>&copy; Playlistr</p>
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
                () => this.filterSingles(this.result)
            );
    }

    filterSingles(records){
        this.releases = records.releases.filter(
            record => record.basic_information.formats[0].descriptions.some(
                description => description === 'Single' || description === '7"'
            )
        )
    }

}
