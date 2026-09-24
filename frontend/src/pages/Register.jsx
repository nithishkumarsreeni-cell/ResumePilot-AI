import hero from "../assets/hero.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();



    const registerUser = async () => {

        if (!name || !email || !password) {

            setMessage("Please fill all fields");

            return;

        }

        try {

            const response = await API.post(

                "/users/register",

                {

                    name,

                    email,

                    password

                }

            );



            console.log(response.data);



            setMessage("Registration successful");



            setTimeout(() => {

                navigate("/login");

            }, 1000);



        }

        catch (error) {

            console.log(error.response);



            if (typeof error.response?.data === "string") {

                setMessage(error.response.data);

            }

            else if (error.response?.data?.message) {

                setMessage(error.response.data.message);

            }

            else if (error.response?.data?.error) {

                setMessage(error.response.data.error);

            }

            else {

                setMessage("Registration failed");

            }

        }

    };



    return (

        <div className="register-container">



            {/* Left Side Illustration */}

            <div className="register-left">

                <img

                    src={hero}

                    alt="ResumePilot AI"

                    className="hero-image"

                />

            </div>





            {/* Right Side Register */}

            <div className="register-right">

                <div className="auth-card">



                    <h1>

                        ResumePilot AI

                    </h1>



                    <p className="tagline">

                        Analyze. Improve. Get Hired.

                    </p>



                    <h2>

                        Create Account

                    </h2>





                    <input

                        className="email-input"

                        type="text"

                        placeholder="Name"

                        value={name}

                        onChange={(e) =>

                            setName(e.target.value)

                        }

                    />





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

                        onClick={registerUser}

                    >

                        Register

                    </button>





                    <p className="message">

                        {message}

                    </p>





                    <p>

                        Already have an account?{" "}

                        <Link to="/login">

                            Login

                        </Link>

                    </p>



                </div>

            </div>

        </div>

    );

}

export default Register;