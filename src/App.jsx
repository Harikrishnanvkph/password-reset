import { Route, Routes } from "react-router-dom"
import { Login } from "./Login"
import { CreateAccount } from "./CreateAccount"
import { PasswordReset } from "./PasswordReset"
import { Home } from "./Home"
import { ForgotPassword } from "./ForgotPassword"
import "./index.css"


function App() {

  return (
    <div className="royal">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createUser" element={<CreateAccount />} />
          <Route path="/validate/:mail" element={<PasswordReset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot_pass" element={<ForgotPassword />} />
        </Routes>
    </div>
  )
}

export default App
