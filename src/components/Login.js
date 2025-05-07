import React from "react";
import "./Login.css";
import Api from "../Api";

const Login = ({ onReceive }) => {
    const handleGoogleLogin = async () => {
      const result = await Api.googlePopup();
      if (result) {
        onReceive(result.user); // <-- funciona com onReceive
      } else {
        alert("Erro ao fazer login com Google!");
      }
    };

    return (
        <div className="login">
            <button onClick={handleGoogleLogin}>Logar com Google</button>
        </div>
    );
};

export default Login;