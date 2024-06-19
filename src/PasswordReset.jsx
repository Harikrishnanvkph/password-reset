import { useRef, useState } from "react"
import "./index.css"
import { checkSecretKey, resetPass } from "./Axios";
import { useNavigate, useParams } from "react-router-dom";


export function PasswordReset(){
    const [secretKey,setSecretKey] = useState("");
    const [pass,setPass] = useState("");
    const [validate,setValidation] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const caMessage = useRef(null);
    const {mail} = useParams();
    const navigate = useNavigate();

    const validateKey = async()=>{
        if(secretKey === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else if(!mail.endsWith("@gmail.com")){
            caMessage.current.textContent = "Invalid GMAIL Address"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const key = await checkSecretKey(mail,secretKey);
            setIsLoading(false);
            switch(key){
                case 200 : {
                    setValidation(false);
                    return;
                }
                case 404 : {
                    caMessage.current.textContent = "Invalid SecretKey";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                default : {
                    caMessage.current.textContent = "Something Weird Happened";
                    return;
                }
            }
        }
    }

    const signUpAccount = async()=>{
        if(pass === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const key = await resetPass(mail,pass);
            setIsLoading(false);
            switch(key){
                case 200 : {
                    navigate("/")
                    return;
                }
                case 404 : {
                    caMessage.current.textContent = "Invalid User";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                default : {
                    caMessage.current.textContent = "Something Weird Happened";
                    return;
                }
            }
        }
    }

    const onInputChange = ()=>{
        caMessage.current.textContent = "Enter Credentials to Create Account";
        caMessage.current.classList.remove("error-message")
    }

    return<>
        <div id="loader" className={isLoading ? "loader" : "d-none"}></div>
        <div className="form container-fluid">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input type="email" disabled value={mail} placeholder={mail}/></div>
                <div><input type="text" value={secretKey} 
                placeholder="Enter One Time SecretKey"
                onChange={(event)=>{
                    onInputChange();
                    setSecretKey(event.target.value)
                }}/></div>
                <div className="mt-3 d-flex justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={validateKey}>Validate</button></div>
                <div><input type="password" placeholder="Enter New Password" value={pass} disabled={validate}
                onChange={(event)=>{
                    onInputChange();
                    setPass(event.target.value)
                }}/></div>
                <div className="mt-3 d-flex justify-content-center align-items-center"
                ><button className="btn btn-primary" disabled={validate}
                onClick={signUpAccount}>Sign Up</button></div>
                <p className="d-flex justify-content-center align-items-center"
                ref={caMessage}>Enter Secret Key to Validate!</p>
            </div>
        </div>
    
    </>
}