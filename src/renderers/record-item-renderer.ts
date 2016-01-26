import {Component, Input} from 'angular2/core';

@Component({
    selector: 'record-item-renderer',
    template: `
        {{record.recordTitle}} | {{record.recordYear}} | <strong>{{record.recordArtist}}</strong>
    `
})
export class RecordItemRenderer {
    @Input() record;
}
