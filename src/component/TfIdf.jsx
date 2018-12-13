function TfIdf() {
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
  
function tokenize(str){
    return str.split(' ');
}

TfIdf.prototype.computeL = function(document, agv){
    
    return document.length/agv
}

TfIdf.prototype.agvLength = function(documents){
    var result = 0;
    for(var i =0; i<documents.length;i++){
        result = result + documents[i].length;
    }
    
    return result/documents.length
}


TfIdf.prototype.weights = function(items,term) {
     
    var results = [];
    var documents=[];
    var nameDocuments=[];
    const nameMulti = 5;
    var nameResults=[];

    var descDocuments=[];
    var descResults=[];
   
    // for(var i=0; i< items.length;i++){
    //     var docsName =  tokenize((items[i]).name.toLowerCase());
    //     let docsDesc=""
    //     if((items[i]).description !== null){
    //         docsDesc =  tokenize((items[i]).description.toLowerCase());
    //     }
    //     var tempDocs = docsName.concat(docsDesc);
    //     documents.push(tempDocs);
    //   }
    // var idf = this.idf(documents,term)
    // var agv = this.agvLength(documents)



    //  for(var i=0;i<documents.length;i++) {
         
    //      var tf = this.tf(documents[i],term, agv)
    //      var tfidf = tf*idf
    //      var result = {weight:tfidf,items:items[i]}    
         
    //      results.push(result)
    //  }

      
///////////////////////////////////////////////////////

     for(var i=0; i< items.length;i++){
        var docsName =  tokenize(xoa_dau(items[i].name).toLowerCase());
        nameDocuments.push(docsName);
     }

     var nameIdf = this.idf(nameDocuments,term)
     var nameAgv = this.agvLength(nameDocuments)

     for(var i=0;i<nameDocuments.length;i++) {
         
        var nameTf = this.tf(nameDocuments[i],term, nameAgv)
        var nameTfidf = nameTf*nameIdf*nameMulti
       // var nameResult = {weight:nameTfidf,items:items[i]}    
         
        nameResults.push(nameTfidf)
    }
    
    for(var i=0; i< items.length;i++){
        let docsDesc=""
        if((items[i]).description !== null){
            docsDesc =  tokenize((items[i]).description.toLowerCase());
        }
        
        descDocuments.push(docsDesc);
     }

    var descIdf = this.idf(descDocuments,term)
    var descagv = this.agvLength(descDocuments)
    
    for(var i=0;i<descDocuments.length;i++) {
        
        var descTf = this.tf(descDocuments[i],term, descagv)
        var descTfidf = descTf*descIdf
        //var result = {weight:tfidf,items:items[i]}    
         
        descResults.push(descTfidf)
    }

    
    for(var i=0;i<items.length;i++){
        var sumRes = nameResults[i] + descResults[i];
        var result = {weight:sumRes,items:items[i]}

        results.push(result);
    }

    return results
}
 
TfIdf.prototype.tf = function(words,term,agv) {
 

    var result = 0;
    const k = 1.25;
    const b = 0.75;



    for(var i=0;i<words.length;i++) {
 
        var word = words[i]
 
        if(word.indexOf(term)!==-1) {
            result = result+1
        }    
    }
    var freq = result;
    var top = (k+1)*freq;
    var L = this.computeL(words,agv)
    var bot = (k*(1-b+b*L)) + freq

    var tfResult = top/bot;
    
    return tfResult;
}
 
TfIdf.prototype.idf = function(documents,term) {
    
    var occurence = 0
 
    for(var j=0;j<documents.length;j++) {
         
        var doc = documents[j]
         
        if(this.__wordInsideDoc(doc,term)){
            occurence = occurence+1
        }
                         
    }
 
    return Math.log(1+(documents.length- occurence +0.5)/(occurence+0.5))
}
 
TfIdf.prototype.__wordInsideDoc = function(doc,term) {
     
    for(var i=0;i<doc.length;i++) {
 
        var word = doc[i]
 
        if(word.indexOf(term)!==-1) {
            return true
        }
    }    
 
    return false
}
 
module.exports = TfIdf