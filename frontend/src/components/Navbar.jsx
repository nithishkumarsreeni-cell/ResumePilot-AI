import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar(){

    const email = localStorage.getItem("email");


    const logout = () => {

        localStorage.removeItem("email");
        localStorage.removeItem("resumeId");

        window.location.href = "/login";

    };


    return (

        <nav className="navbar">

            <div className="logo">

                <h2>
                    AI Resume Analyzer
                </h2>

            </div>


            <div className="user-section">

                <span>
                    <FaUserCircle /> {email}
                </span>


                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <FaSignOutAlt />
                    Logout

                </button>

            </div>


        </nav>

    );

}


export default Navbar;