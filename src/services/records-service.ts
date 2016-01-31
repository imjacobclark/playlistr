import {Injectable} from 'angular2/core';
import {Record} from '../models/record-model';

@Injectable()
export class RecordsService{
    allRecords: Array<Record> = [];
    singles: Array<Record> = [];
    
    filterSingles(): Array<Record>{
        let sizeOfCollection = this.allRecords.length,
            recordsInPlaylist = [],
            i = 0;
            
        this.singles = [];
        
        if(this.allRecords.length > 0){
            while(i <= 4){
                let selectedRecord = Math.floor(Math.random() * sizeOfCollection) + 0;
                    if(recordsInPlaylist.indexOf(selectedRecord) === -1){
                        if(this.allRecords[selectedRecord].isSingle === true){
                            this.singles.push(this.allRecords[selectedRecord]);
                            recordsInPlaylist.push(selectedRecord);
                            i++;
                        }
                    }
                }
            }

        return this.singles;
    }
}
