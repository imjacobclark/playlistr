import {Injectable} from 'angular2/core';
import {Record} from '../models/record-model';

@Injectable()
export class RecordsService{
    allRecords: Array<Record> = [];
    singles: Array<Record> = [];
}
