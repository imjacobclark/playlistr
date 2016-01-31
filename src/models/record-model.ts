export class Record{
    recordTitle: string;
    recordArtist: string;
    recordLabel: string;
    recordGenre: string;
    recordCountry: string;
    recordWeight: number;
    recordFormats: Array<String>;
    recordYear: number;
    resourceUrl: string;
    isSingle: boolean;
    notes: string;
    recordImage: string;

    constructor(record: Object){
        this.recordTitle = record['basic_information'].title;
        this.recordArtist = record['basic_information'].artists[0].name;
        this.recordFormats = record['basic_information'].formats[0].descriptions;
        this.recordYear = record['basic_information'].year;
        this.resourceUrl = record['basic_information'].resource_url;
        this.isSingle = this.checkIfSingle(this.recordFormats);
    }

    checkIfSingle(formats): boolean{
        return formats.some(
            description => description === 'Single' || description === '7"'
        )
    }
}
