var config = require('./configure')
var mssql = require('mssql');
const e = require('cors');


var GetPersonnelAuthorization = async(CardNo, ReaderCode, CardReadDate, CardReadTime, UserCode, VerifyMode) => { 

    try {
        
        var pool = await mssql.connect(config);
        var user_auth = await pool.request()
        .input('CardNo', mssql.Char(16), CardNo)
        .input('ReaderCode', mssql.VarChar(50), ReaderCode)
        .input('CardReadDate', mssql.Char(8), CardReadDate)
        .input('CardReadTime', mssql.Char(6), CardReadTime)
        .input('UserCode', mssql.NVarChar(50), UserCode)
        .input('VerifyMode', mssql.Int, VerifyMode)
        .execute('cpsp_GetPersonnelAuthorization');
        return user_auth.recordset;
  
    } catch (error) {
         
       console.log(error); 
    }
  
  }

  var GetUserByCode = async(uid) => { 

    try {
        
        var pool = await mssql.connect(config);
        var users = await pool.request()
        .input('UserCode', mssql.VarChar(30), uid)
        .execute('cpsp_UsersSelectByUserCode');
        return users.recordset;
  
    } catch (error) {
         
       console.log(error); 
    }
  
  }
 

module.exports =  { 
  GetUserByCode: GetUserByCode,
  GetPersonnelAuthorization: GetPersonnelAuthorization,  
} 