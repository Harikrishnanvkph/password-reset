import axios from "axios";


async function login(credential,password){
    const status = await axios(
        {
            url : "https://password-reset-server-qhcc.onrender.com/login",
            method : "post",
            data : {
                mail : credential,
                password : password 
            }
        }
    )
    return status.data;
}

async function forgotPass(mail){
    const status = await axios({
        url : "https://password-reset-server-qhcc.onrender.com/password_reset",
        method : "post",
        data : {
            mail : mail
        }
    })
    return status.data;
}

async function checkSecretKey(mail,secretKey){
    const status = await axios({
        url : "https://password-reset-server-qhcc.onrender.com/checkKey",
        method : "post",
        data : {
            mail : mail,
            secretKey : secretKey
        }
    })
    return status.data;
}

async function resetPass(mail,pass){
    const status = await axios({
        url : "https://password-reset-server-qhcc.onrender.com/set/password",
        method : "post",
        data : {
            mail : mail,
            password : pass
        }
    })
    return status.data;
}

async function createAccount(mail,name,pass){
    const status = await axios({
        url : "https://password-reset-server-qhcc.onrender.com/createUser",
        method : "post",
        data : {
            mail : mail,
            name : name,
            password : pass
        }
    })
    return status.data;
}

export {createAccount,resetPass,forgotPass,login, checkSecretKey}
