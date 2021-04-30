var express = require('express')
var crypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var dbconnection = require('../datas/queries')
var seckey = require('../controllers/sec_key')
var tokenKontrol = require('../controllers/token_kontrol')

var router = express.Router(); 
//var app = express(); 

router.post('/auth', tokenKontrol.Yetki_Kontrol, async(req, res)=> { 

    try {

           var cardno = await req.body.CardNo
           var readercode = await req.body.ReaderCode
           var cardreaddate = await req.body.CardReadDate
           var cardreadtime = await req.body.CardReadTime
           var usercode = await req.body.UserCode
           var verifymode = await req.body.VerifyMode
     
        
       dbconnection.GetPersonnelAuthorization(cardno, readercode,cardreaddate,
        cardreadtime, usercode, verifymode).then(result => { 
           
            if(result[0]) {  

                return res.sendStatus(200).json({                    
                    mesaj:"Başarılı giriş"
                })

            } else { 

                return res.sendStatus(403).json({                    
                    mesaj:"Hatalı giriş"
                })
            }

        })


    } catch (error) {
        
        res.send(error)
    }

})


router.post('/login', async(req, res)=> { 
 
    try {

        //var hashedPass = await crypt.hash(req.body.password, 10);
        var sifre = await req.body.password
        var hashedUid = await req.body.usercode 
        //console.log(hashedPass);

        dbconnection.GetUserByCode(hashedUid).then(async result => {  

            if(result[0]){  

                if(hashedUid == result[0].UserCode){ 
                      
                    if(await crypt.compare(sifre, result[0].Password)) { 
                       
                        var accesToken =  jwt.sign(
                        userinfo = {                                                            
                                username: result[0].UserCode,
                                userregno: result[0].GroupCode, 
                                fullname: result[0].FirstName,
                                emailadress: result[0].Email
                
                        }, seckey.sexret_key, 
                            { 
                                expiresIn: "1h"
                        });
                        
                        res.json({accesToken: accesToken}); 

                        //console.log(accesToken)
                        console.log('Giriş Başarılı')
                        res.send("Giriş başarılı")
                        //res.redirect('/login')

                    }else{  

                        console.log("bağlantı içi");
                        console.log('Kullanıcı adı veya şifre hatalı')
                        res.send('Kullanıcı adı veya şifre hatalı')
                        //res.redirect('/login');
                    }
                     
                }else{  
                    console.log("bağlantı içi");
                    console.log('Kullanıcı adı veya şifre hatalı')
                    res.send('Kullanıcı adı veya şifre hatalı')
                    //res.redirect('/login');
                }

            }  else { 
                console.log("bağlantı içi");
                res.send('Kullanıcı adı veya şifre hatalı')
            }

         })

    } catch (error) {
        console.log(error);
        res.send('Kullanıcı adı veya şifre hatalı')
    }

})


router.route('/deneme', (req, res) => { 

    res.send("iis çalışıyor")
})



module.exports = router; 