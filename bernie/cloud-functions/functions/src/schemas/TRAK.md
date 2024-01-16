## TRAK : Symbol

- trakID : Symbol;
- trakURI : Symbol;
- isrc : number
- type : ‘TRACK' | ‘TAPE’ | ‘ARTIST’ | 'ARTICLE' | 'GAME';
- isNFT : boolean;
- content : {
-              trakIPO : Symbol;
-              trakIMAGE : any;
-              trakAUDIO : any;
-              trakVIDEO : any;
-           };
- subscriptions : string[];
- web : {
-          spotify : any[];
-          apple_music : any[];
-          genius : any[];
-       }

## setTRAK

- isrc : number
- type : ‘TRACK' | ‘TAPE’ | ‘ARTIST’ | 'ARTICLE' | 'GAME';
- isNFT : boolean;
- trakIPO : Symbol;
- trakIMAGE : any;
- trakAUDIO : any;
- trakVIDEO : any;
- subscriptions : string[];
- spotify : any[];
- apple_music : any[];
- genius : any[];
