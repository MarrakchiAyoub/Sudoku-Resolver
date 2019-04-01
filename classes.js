class Result{
    constructor(ln,col,val){
        this.line=ln;
        this.column=col;
        this.value= parseInt(val);
        if(ln<=3 && col<=3){
            this.sqr=1;
        }
        else if(ln<=3 && col<=6){
            this.sqr=2;
        }
        else if(ln<=3 && col<=9){
            this.sqr=3;
        }
        else if(ln<=6 && col<=3){
            this.sqr=4;
        }
        else if(ln<=6 && col<=6){
            this.sqr=5;
        }
        else if(ln<=6 && col<=9){
            this.sqr=6;
        }
        else if(ln<=9 && col<=3){
            this.sqr=7;
        }
        else if(ln<=9 && col<=6){
            this.sqr=8;
        }
        else if(ln<=9 && col<=9){
            this.sqr=9;
        }
    }
    getLine(){
        return this.line;
    }
    getColumn(){
        return this.column;
    }
    getSqr(){
        return this.sqr;
    }
    getValue(){
        return this.value;
    }
}
class suggestion{
    constructor(ln, col){
        this.posibilities = new Array();
        this.posibilities.push(1,2,3,4,5,6,7,8,9);
        this.line=ln;
        this.column=col;
        if(ln<=3 && col<=3){
            this.sqr=1;
        }
        else if(ln<=3 && col<=6){
            this.sqr=2;
        }
        else if(ln<=3 && col<=9){
            this.sqr=3;
        }
        else if(ln<=6 && col<=3){
            this.sqr=4;
        }
        else if(ln<=6 && col<=6){
            this.sqr=5;
        }
        else if(ln<=6 && col<=9){
            this.sqr=6;
        }
        else if(ln<=9 && col<=3){
            this.sqr=7;
        }
        else if(ln<=9 && col<=6){
            this.sqr=8;
        }
        else if(ln<=9 && col<=9){
            this.sqr=9;
        }
    }
    remove(index){
        while (index<this.posibilities.length) {
            this.posibilities[index]=this.posibilities[index+1];
            index++;
        }
        this.posibilities.pop();
    }
    getPossibilities(){
        return [...this.posibilities]; // returns the value not the reference of the array
    }
    empty(){
        this.posibilities=[];
    }
    lonely_in_line(array){
        let p=this.getPossibilities();
        let n=-1;
        for(let i=0;i<array.length;i++){ //for evey element in array
            let element = array[i];
            if(element.line!=this.line || element.column!=this.column){ //not the same element
                if(element.line==this.line){ //in the same square
                    for(let j=0; j<p.length; j++){
                        let m= p[j];
                        let k = element.posibilities.indexOf(m);
                        if(k!=-1){ 
                            p[j]=null //if the number is not alone it becomes null
                        }
                    }
                }
            }
        
        }
        let temp = [];
        for (let index = 0; index < p.length; index++) {
            if(p[index]){
                temp.push(p[index]); //pushes every number that's not null
            }
        }
        if(temp.length==1){ //checks if there's only one number
            n=temp[0];
        }
        return n; // returns the number or -1 if no lonely number is found
    }
    lonely_in_col(array){
        let p=this.getPossibilities();
        let n=-1;
        for(let i=0;i<array.length;i++){ //for evey element in array
            let element = array[i];
            if(element.line!=this.line || element.column!=this.column){ //not the same element
                if(element.column==this.column){ //in the same column
                    for(let j=0; j<p.length; j++){
                        let m= p[j];
                        let k = element.posibilities.indexOf(m);
                        if(k!=-1){ 
                            p[j]=null
                        }
                    }
                }
            }
        
        }
        let temp = [];
        for (let index = 0; index < p.length; index++) {
            if(p[index]){
                temp.push(p[index]);
            }
        }
        if(temp.length==1){
            n=temp[0];
        }
        return n;
    }
    lonely_in_sqr(array){
        let p=this.getPossibilities();
        let n=-1;
        for(let i=0;i<array.length;i++){ //for evey element in array
            let element = array[i];
            if(element.line!=this.line || element.column!=this.column){ //not the same element
                if(element.sqr==this.sqr){ //in the same square
                    for(let j=0; j<p.length; j++){
                        let m= p[j];
                        let k = element.posibilities.indexOf(m);
                        if(k!=-1){ 
                            p[j]=null
                        }
                    }
                }
            }
        
        }
        let temp = [];
        for (let index = 0; index < p.length; index++) {
            if(p[index]){
                temp.push(p[index]);
            }
        }
        if(temp.length==1){
            n=temp[0];
        }
        return n;
    }
}