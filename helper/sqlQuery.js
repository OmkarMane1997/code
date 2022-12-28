const insertQuery = (obj,tableName) => {
    var col = Object.keys(obj).toString();
    var values = JSON.stringify(Object.values(obj)).slice(1, -1);
    var sql = "INSERT INTO "+tableName+" ("+col+") VALUES ("+values+") ";
    //   console.log(sql);
    return sql;
}

 const updateQuery = (obj,tableName,whereCondition) => {
    var values = "";
    var lastKey = Object.keys(obj)[Object.keys(obj).length-1];
    for (const key in obj) {
        var value = ""+obj[key]+"";
        if(lastKey == key){
            values+= key+ " = '"+value.replaceAll("'", "\'")+"'";
        }else{
            values+= key+ " = '"+value.replaceAll("'", "\'")+"', ";
        }
       
      }
    var sql = "UPDATE "+tableName+" SET "+values+" WHERE "+ whereCondition+"";
      console.log(sql);
    return sql;
}

 const selectQuery = (tableName,col = [],whereCondition ="",join = "" , pagination = "",search = "") => {
    var columns  = '*';
    if(col.length > 0){
        columns = "";
        col.map((e,index) => {
           columns+= col.length == (index + 1) ? e :e+",";
        })
    } 
    var whereClause = "";
    if(whereCondition && whereCondition != ""){
        whereClause = "WHERE "+ whereCondition+"";
    }
    var sql = "SELECT  "+columns+" FROM  "+tableName+" " + join+ " "+ whereClause+" "+search+" ORDER by "+tableName+".id DESC " + pagination;
      console.log(sql);
    return sql;
}

 const selectCountQuery = (tableName,col = [],whereCondition ="",join = "" ,search = "") => {
    var columns  = '*';
    if(col.length > 0){
        columns = "";
        col.map((e,index) => {
           columns+= col.length == (index + 1) ? e :e+",";
        })
    } 
    var whereClause = "";
    if(whereCondition && whereCondition != ""){
        whereClause = "WHERE "+ whereCondition+"";
    }
    var sql = "SELECT  "+columns+" FROM  "+tableName+" " + join+ " "+ whereClause+" " +search+" ";
      console.log(sql);
    return sql;
}

module.exports =  {
   insertQuery,
     updateQuery,
     selectCountQuery,
    selectQuery
};