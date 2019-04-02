/*
----Written By: Marrakchi Ayoub----
-- This Algorithme can only solve sudoku games of a medium level (<48 hidden numbers) --
-- plese do not insert a level hard in this programm
     if you don't want to be stuck in an infinite loop --
 */
var results = new Array(9);
for(let i=0;i<9;i++){
    results[i]= new Array(9).fill(null);
}
var suggestions = new Array();
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        suggestions.push(new suggestion(i+1,j+1));
    }
}
function addNumber(line, column, number){
    let r = new Result(line, column, number);
    results[r.getLine()-1][r.getColumn()-1]=r;
}
function cleanSugg() {
    //This function is for cleaning suggestions from impossible possibilities
    suggestions.forEach(s => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let r = results[i][j];
                if(r!=null && s.posibilities){
                    if(s.line==r.line || s.column==r.column || s.sqr==r.sqr){
                        let index = s.posibilities.indexOf(r.value);
                        if(index!=-1){
                            s.remove(index);
                        }
                    }
                }
            }   
        }
        if(results[s.line-1][s.column-1]!=null){
            s.empty();
        }
    });
}
function isFinished(){
    for (let i = 0; i < suggestions.length; i++) {
        if(suggestions[i].posibilities.length>0){
            return false;
        }
    }
    return true;
}
function resolve(){
    //This is the main function of this algorithm
    while (!isFinished()) { //it doesn't stop until the grid is fully completed
        suggestions.forEach(s => {
            cleanSugg();
            if(s.posibilities.length===1){ //if there's only one possibility
                let n = s.posibilities[0];
                results[s.line-1][s.column-1]= new Result(s.line, s.column, n); //it becomes a result
            }
            cleanSugg();
            let k= s.lonely_in_line(suggestions) //if the suggestions has a number that's the only possibility in the row
            if(k!=-1 && s.posibilities){
                results[s.line-1][s.column-1]= new Result(s.line, s.column, k);
            }
            k= s.lonely_in_col(suggestions) //the number is the only possibility the column
            if(k!=-1 && s.posibilities){
                results[s.line-1][s.column-1]= new Result(s.line, s.column, k);
            }
            k= s.lonely_in_sqr(suggestions) //the number is the only possibility the square
            if(k!=-1 && s.posibilities){
                results[s.line-1][s.column-1]= new Result(s.line, s.column, k);
            }
            console.log('test');
        refill();
        });
    }
    console.log(suggestions, results);
}
function refill(){
    //This function fills the grid with the results
    $('input').each((index, element)=>{
            let td = $(element).parent();
            let tr = td.parent();
            let i = parseInt(tr.data('line'))-1;
            let j = parseInt(td.data('col'))-1;
            if(results[i][j]){
                $(element).val(results[i][j].value);
            }
    });
}