var jwt = require('jsonwebtoken')
var secret_key = require('./sec_key')

var Yetki_Kontrol = (req, res, next)=>{ 
  
    try
    {
        var tokenHeader = req.headers["authorization"];
        var token = tokenHeader && tokenHeader.split(" ")[1];

        if(token == null) return res.sendStatus(401)

        jwt.verify(token, secret_key.sexret_key, (err, udata)=>{ 

            if(err){  

                return res.status(403).json({  
                    mesaj: "Yetkisiz"
                })

            }
          
          req.user = udata
          next();  

        })

    } 
    catch (error) {
        
        return res.status(404).json({  
            mesaj: "Not found"
        })
    }
 
}


module.exports = { 
    Yetki_Kontrol
}