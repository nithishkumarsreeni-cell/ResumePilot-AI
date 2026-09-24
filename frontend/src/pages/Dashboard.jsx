import banner from "../assets/dashboard-banner.png";
import logo from "../assets/logo.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import ResumeHistory from "../components/ResumeHistory";

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function Dashboard() {


    const [analyses, setAnalyses] = useState([]);

    const [latestResume, setLatestResume] = useState(null);


    const navigate = useNavigate();


    const userName =
        localStorage.getItem("userName") || "User";


    const userEmail =
        localStorage.getItem("userEmail") || "";


    const userId =
        localStorage.getItem("userId");



    useEffect(() => {


        loadHistory();

        loadLatestResume();


    }, []);



    const loadHistory = async () => {


        try {


            if (!userId) {

                return;

            }


            const response = await API.get(

                `/analysis/history/${userId}`

            );


            setAnalyses(response.data);


        }
        catch (error) {


            console.log(error);


        }


    };



    const loadLatestResume = async () => {


        try {


            if (!userId) {

                return;

            }


            const response = await API.get(

                `/resumes/latest/${userId}`

            );


            setLatestResume(response.data);


        }
        catch (error) {


            console.log(error);


        }


    };



    const latestScore =

        analyses.length > 0

            ?

            analyses[analyses.length - 1].atsScore

            :

            0;



    // Show only the latest 10 analyses on the dashboard

    const chartData = analyses

        .slice(-10)

        .map((item, index) => (

            {
                name: `Analysis ${index + 1}`,
                score: item.atsScore
            }

        ));



    const latestAnalysis =

        analyses.length > 0

            ?

            analyses[analyses.length - 1]

            :

            null;



    return (


        <div className="dashboard">


            {/* Navbar */}

            <div className="dashboard-navbar">


                <div className="logo-section">


                    <img

                        src={logo}

                        alt="ResumePilot AI"

                        className="app-logo"

                    />


                    <div>


                        <h2>
                            ResumePilot AI
                        </h2>


                        <small className="logo-tagline">
                            Analyze. Improve. Get Hired.
                        </small>


                    </div>


                </div>



                <div className="dashboard-links">


                    <button

                        onClick={() =>
                            navigate("/dashboard")
                        }

                    >

                        🏠 Dashboard

                    </button>



                    <button

                        onClick={() =>
                            navigate("/upload")
                        }

                    >

                        📤 Upload Resume

                    </button>



                    <button

                        onClick={() =>
                            navigate("/analysis-history")
                        }

                    >

                        📊 Analysis History

                    </button>



                    <button

                        className="logout-btn"

                        onClick={() => {


                            localStorage.clear();


                            navigate("/login");


                        }}

                    >

                        🚪 Logout

                    </button>


                </div>



                <div className="user-profile">


                    <h4>
                        👤 {userName}
                    </h4>


                    <span>
                        {userEmail}
                    </span>


                </div>


            </div>



            {/* Banner */}

            <div className="dashboard-banner">


                <img

                    src={banner}

                    alt="ResumePilot AI"

                    className="banner-image"

                />


            </div>



            {/* Welcome Section */}

            <div className="dashboard-welcome">


                <h1>
                    Welcome, {userName}
                </h1>


                <p>

                    Welcome to ResumePilot AI.
                    Upload resumes, analyze ATS scores,
                    discover skill gaps, and prepare for your dream job.

                </p>


            </div>



            {/* Latest Resume */}

            {

                latestResume && (


                    <div className="latest-resume-card">


                        <h2>
                            📄 Latest Resume
                        </h2>


                        <p>

                            <b>File Name:</b>{" "}

                            {latestResume.fileName}

                        </p>


                        <p>

                            <b>Uploaded:</b>{" "}

                            {

                                new Date(
                                    latestResume.uploadedDate
                                ).toLocaleString()

                            }

                        </p>


                        <p>

                            <b>Status:</b>{" "}

                            ✅ Uploaded Successfully

                        </p>


                        <button

                            className="analyze-resume-btn"

                            onClick={() => {


                                localStorage.setItem(

                                    "resumeId",

                                    latestResume.id

                                );


                                navigate("/analyze");


                            }}

                        >

                            🤖 Analyze This Resume

                        </button>


                    </div>


                )

            }



            {/* Statistics */}

            <div className="dashboard-stats">


                <div className="stats-card">


                    <h3>
                        📊 Total Analyses
                    </h3>


                    <h1>
                        {analyses.length}
                    </h1>


                </div>



                <div className="stats-card score-dashboard">


                    <h3>
                        🎯 Latest ATS Score
                    </h3>


                    {

                        analyses.length > 0

                            ?

                            <div className="dashboard-circle">


                                <CircularProgressbar

                                    value={latestScore}

                                    text={`${latestScore}%`}

                                    styles={

                                        buildStyles({

                                            pathColor: "#16a34a",

                                            textColor: "#111827",

                                            trailColor: "#e5e7eb"

                                        })

                                    }

                                />


                            </div>

                            :

                            <p>
                                No analysis yet
                            </p>

                    }


                </div>


            </div>



            {/* Latest Analysis */}

            {

                latestAnalysis && (


                    <div className="latest-analysis-card">


                        <div>


                            <h2>
                                🤖 Latest Analysis
                            </h2>


                            <p>
                                Your most recent resume analysis is ready.
                            </p>


                        </div>


                        <div className="latest-analysis-score">


                            {latestAnalysis.atsScore}%

                        </div>


                        <button

                            className="view-analysis-btn"

                            onClick={() =>


                                navigate(

                                    "/analysis-details",

                                    {

                                        state: latestAnalysis

                                    }

                                )


                            }

                        >

                            View Full Analysis →

                        </button>


                    </div>


                )

            }



            {/* ATS Chart */}

            <div className="chart-card">


                <div className="chart-header">


                    <div>


                        <h2>
                            📈 ATS Score Trend
                        </h2>


                        <p>
                            Your latest 10 resume analyses
                        </p>


                    </div>


                    <button

                        className="history-link-btn"

                        onClick={() =>
                            navigate("/analysis-history")
                        }

                    >

                        View History →

                    </button>


                </div>


                {

                    chartData.length > 0

                        ?

                        <ResponsiveContainer

                            width="100%"

                            height={300}

                        >


                            <LineChart

                                data={chartData}

                            >


                                <CartesianGrid />


                                <XAxis

                                    dataKey="name"

                                />


                                <YAxis

                                    domain={[0, 100]}

                                />


                                <Tooltip />


                                <Line

                                    type="monotone"

                                    dataKey="score"

                                    stroke="#2563eb"

                                    strokeWidth={3}

                                />


                            </LineChart>


                        </ResponsiveContainer>

                        :

                        <div className="chart-empty-state">


                            <h3>
                                No ATS Score Data Yet
                            </h3>


                            <p>

                                Analyze your first resume to
                                see your ATS score trend here.

                            </p>


                        </div>

                }


            </div>



            {/* My Uploaded Resumes */}

            <ResumeHistory />


        </div>


    );


}


export default Dashboard;