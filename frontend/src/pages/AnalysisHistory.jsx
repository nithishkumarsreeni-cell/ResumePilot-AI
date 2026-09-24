import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function AnalysisHistory() {


    const [analyses, setAnalyses] = useState([]);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const userId =
        localStorage.getItem("userId");



    useEffect(() => {


        loadAnalysisHistory();


    }, []);



    const loadAnalysisHistory = async () => {


        try {


            setLoading(true);


            const response = await API.get(

                `/analysis/history/${userId}`

            );


            setAnalyses(response.data);


        }
        catch (error) {


            console.log(error);


        }
        finally {


            setLoading(false);


        }


    };



    return (


        <div className="analysis-history-page">


            <div className="history-page-header">


                <div>


                    <h1>
                        📊 Analysis History
                    </h1>


                    <p>
                        View and review your previous resume analyses.
                    </p>


                </div>


                <button

                    className="history-upload-btn"

                    onClick={() =>
                        navigate("/upload")
                    }

                >

                    📤 Upload New Resume

                </button>


            </div>



            {

                loading

                    ?

                    <div className="history-loading">

                        Loading analysis history...

                    </div>

                    :

                    analyses.length === 0

                        ?

                        <div className="analysis-empty-state">


                            <div className="empty-icon">

                                📊

                            </div>


                            <h2>
                                No Analysis History Yet
                            </h2>


                            <p>
                                Upload and analyze your first resume
                                to see your ATS score and AI insights here.
                            </p>


                            <button

                                className="analyze-first-btn"

                                onClick={() =>
                                    navigate("/upload")
                                }

                            >

                                📤 Upload Your First Resume

                            </button>


                        </div>

                        :

                        <div className="analysis-history-grid">


                            {

                                analyses.map(

                                    (item, index) => (


                                        <div

                                            className="analysis-history-card"

                                            key={item.id}

                                        >


                                            <div className="analysis-card-top">


                                                <div>


                                                    <span className="analysis-number">

                                                        Analysis #{index + 1}

                                                    </span>


                                                    <h3>

                                                        📄 Resume Analysis

                                                    </h3>


                                                </div>


                                                <div className="history-score-badge">

                                                    {item.atsScore}%

                                                </div>


                                            </div>



                                            <div className="history-summary">


                                                <div>


                                                    <span>
                                                        🎯 ATS Score
                                                    </span>


                                                    <strong>
                                                        {item.atsScore}%
                                                    </strong>


                                                </div>


                                                <div>


                                                    <span>
                                                        💼 Suggested Roles
                                                    </span>


                                                    <p>

                                                        {
                                                            item.suitableJobRoles
                                                                ?.slice(0, 2)
                                                                .join(", ")
                                                        }

                                                    </p>


                                                </div>


                                            </div>



                                            <div className="history-card-actions">


                                                <button

                                                    className="view-analysis-btn"

                                                    onClick={() =>


                                                        navigate(

                                                            "/analysis-details",

                                                            {
                                                                state: item
                                                            }

                                                        )


                                                    }

                                                >

                                                    View Full Analysis →

                                                </button>


                                            </div>


                                        </div>


                                    )

                                )

                            }


                        </div>


            }


        </div>


    );


}


export default AnalysisHistory;