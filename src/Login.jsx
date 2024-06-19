import { useRef, useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom";
import { login } from "./Axios";


export function Login(){
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputColor = useRef(null);
    const buttonName = useRef(null);
    const navigate = useNavigate();
    const caMessage = useRef(null);

    const onInputChange = ()=>{
        caMessage.current.textContent = "Awesome day to Login In!";
        caMessage.current.classList.remove("error-message")
    }

    const loginClick = async(user,pass)=>{
        if(user === "" || pass === ""){
            caMessage.current.textContent = "Input Fields cannot be EMPTY"
            caMessage.current.classList.add("error-message")
        }else{
            setIsLoading(true);
            const log = await login(user,pass);
            setIsLoading(false);
            switch(log){
                case 200 : {
                    navigate("/home");
                    return;
                }
                case 404 : {
                    caMessage.current.textContent = "Invalid Credentials";
                    caMessage.current.classList.add("error-message")
                    return;
                }
                default : {
                    console.log("Something Weird Happened");
                    return;
                }
            }
        }
    }

    const createAccountClick = ()=>{
        navigate("/createUser")
    }

    return<> 
        <div id="loader" className={isLoading ? "loader" : "d-none"}></div>
        <div className="form container-fluid">
            <div className="form2 row">
                <h4>Hari GAS Company</h4>
                <div><input ref={inputColor} type="text" placeholder="Enter Name or Mail" value={user} 
                onChange={(event)=>{
                    onInputChange()
                    setUser(event.target.value)}}/></div>
                <div><input type="password" placeholder="Enter Your Password" value={pass} 
                onChange={(event)=>{
                    onInputChange()
                    setPass(event.target.value)}}/></div>
                <p className="d-flex justify-content-end align-items-center forgot"
                onClick={()=>{navigate("/forgot_pass")}}>Forgot Password?</p>
                <div className="d-flex justify-content-center align-items-center"><button className="btn btn-primary" ref={buttonName}
                onClick={()=>{loginClick(user,pass)}}>Login</button></div>
                <div className="d-flex justify-content-center align-items-center"><button className="btn btn-primary"
                onClick={createAccountClick}>Create An Account</button></div>
                <p className="d-flex justify-content-center align-items-center"
                ref={caMessage}>Awesome day to Login In!</p>
            </div>
        </div>
    
    </>
}