import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";


function AnalysisDetails(){


    const location = useLocation();

    const navigate = useNavigate();


    const analysis = location.state;







    const downloadPDF = ()=>{


        const doc = new jsPDF();



        doc.setFontSize(20);


        doc.text(
            "AI Resume Analysis Report",
            20,
            20
        );



        let y = 35;



        doc.setFontSize(12);



        doc.text(
            `ATS Score: ${analysis.atsScore}%`,
            20,
            y
        );



        y += 15;







        const addSection=(title,items)=>{


            doc.setFontSize(15);


            doc.text(
                title,
                20,
                y
            );


            y += 10;



            doc.setFontSize(12);



            items?.forEach(item=>{


                doc.text(
                    "• " + item,
                    25,
                    y
                );


                y += 8;



                if(y > 270){


                    doc.addPage();

                    y = 20;


                }


            });



            y += 10;


        };








        addSection(
            "Strengths",
            analysis.strengths
        );



        addSection(
            "Weaknesses",
            analysis.weaknesses
        );



        addSection(
            "Missing Skills",
            analysis.missingSkills
        );



        addSection(
            "Suggestions",
            analysis.suggestions
        );



        addSection(
            "Suitable Job Roles",
            analysis.suitableJobRoles
        );



        addSection(
            "Interview Questions",
            analysis.interviewQuestions
        );






        doc.save(
            "AI_Resume_Analysis_Report.pdf"
        );


    };









    if(!analysis){


        return(

            <div className="analysis-preview">


                <h2>
                    No Analysis Data Found
                </h2>



                <button

                    className="back-btn"

                    onClick={()=>navigate("/dashboard")}

                >

                    Go Dashboard

                </button>



            </div>

        );


    }









    return(



        <div className="analysis-details-page">





            <h1>

                📄 Resume Analysis Report

            </h1>







            {

            analysis.fileName &&

            <p>

                📎 {analysis.fileName}

            </p>

            }







            {

            analysis.uploadedDate &&

            <p>

                📅 Uploaded:
                {" "}
                {analysis.uploadedDate}

            </p>

            }









            <button

                className="back-btn"

                onClick={()=>navigate("/dashboard")}

            >

                ← Back to Dashboard

            </button>









            <button

                className="download-btn"

                onClick={downloadPDF}

            >

                📥 Download Report

            </button>









            <div className="analysis-score-card">


                <h2>

                    📊 ATS Score

                </h2>




                <div className="big-score">

                    {analysis.atsScore}%

                </div>



            </div>









            <div className="details-grid">





                <DetailCard

                    title="✅ Strengths"

                    items={analysis.strengths}

                />



                <DetailCard

                    title="❌ Weaknesses"

                    items={analysis.weaknesses}

                />



                <DetailCard

                    title="🛠 Missing Skills"

                    items={analysis.missingSkills}

                />



                <DetailCard

                    title="💡 Suggestions"

                    items={analysis.suggestions}

                />



                <DetailCard

                    title="💼 Suitable Roles"

                    items={analysis.suitableJobRoles}

                />



                <DetailCard

                    title="🎤 Interview Questions"

                    items={analysis.interviewQuestions}

                />




            </div>





        </div>


    );


}






function DetailCard({title,items}){


    return(


        <div className="detail-card">


            <h3>

                {title}

            </h3>



            <ul>


            {

            items?.map(

                (item,index)=>(

                    <li key={index}>

                        {item}

                    </li>

                )

            )

            }


            </ul>


        </div>


    );


}




export default AnalysisDetails;