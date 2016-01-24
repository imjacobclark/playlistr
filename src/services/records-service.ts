import {Injectable} from 'angular2/core';
import {Record} from '../models/record';

@Injectable()
export class RecordsService{
    records: Array<Record> = [];
}
