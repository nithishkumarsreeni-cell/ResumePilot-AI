import hero from "../assets/hero.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();



    const loginUser = async () => {

        if (!email || !password) {

            setMessage("Please enter email and password");

            return;

        }

        try {

            const response = await API.post(

                "/users/login",

                {

                    email,

                    password

                }

            );

            localStorage.setItem(

                "userName",

                response.data.name

            );

            localStorage.setItem(

                "userEmail",

                response.data.email

            );

            localStorage.setItem(

                "userId",

                response.data.id

            );

            localStorage.setItem(

                "isLoggedIn",

                "true"

            );
            localStorage.removeItem("resumeId");

            setMessage(

                "Login successful. Redirecting..."

            );

            setTimeout(() => {

                navigate("/dashboard");

            }, 1000);

        }

        catch (error) {

            console.log(error.response);

            setMessage(

                error.response?.data ||

                "Login failed"

            );

        }

    };



    return (

        <div className="login-container">



            {/* Left Side Illustration */}

            <div className="login-left">

                <img

                    src={hero}

                    alt="ResumePilot AI"

                    className="hero-image"

                />

            </div>





            {/* Right Side Login */}

            <div className="login-right">

                <div className="auth-card">

                    <h1>

                        ResumePilot AI

                    </h1>

                    <p className="tagline">

                        Analyze. Improve. Get Hired.

                    </p>



                    <h2>

                        Login

                    </h2>



                    <input

                        className="email-input"

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                    />



                    <input

                        className="email-input"

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>

                            setPassword(e.target.value)

                        }

                    />



                    <button

                        className="upload-btn"

                        onClick={loginUser}

                    >

                        Login

                    </button>



                    <p className="message">

                        {message}

                    </p>



                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;