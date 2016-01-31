import {Component, Input} from 'angular2/core';

@Component({
    selector: 'record-item-renderer',
    template: `
        <div class="col-md-9">
            <h1> {{record.recordTitle}}</h1>
            <h3>{{record.recordArtist}}</h3>
            <p class="hidden-xs hidden-sm">
                <strong>Label</strong>: {{record.recordLabel}} <br />
                <strong>Genre</strong>: {{record.recordGenre}} <br />
                <strong>Released</strong>: {{record.recordYear}} <br />
                <strong>Country</strong>: {{record.recordCountry}} <br />
                <strong>Weight</strong>: {{record.recordWeight}}
            </p>
        </div>
        <div class="col-md-3">
            <img src="{{record.image}}" class="center-block hidden-xs hidden-sm img-circle img-responsive">
        </div>
    `
})
export class RecordItemRenderer {
    @Input() record;
}
