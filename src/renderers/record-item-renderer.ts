import {Component, Input} from 'angular2/core';

@Component({
    selector: 'record-item-renderer',
    template: `
        <div class="col-md-6">
            <h1> {{record.recordTitle}}</h1>
            <h3>{{record.recordArtist}}</h3>
            <p>{{record.notes}}</p>
        </div>
        <div class="col-md-6">
            <img src="{{record.image}}" class="center-block hidden-xs hidden-sm hidden-s img-circle img-responsive">
        </div>
    `
})
export class RecordItemRenderer {
    @Input() record;
}
