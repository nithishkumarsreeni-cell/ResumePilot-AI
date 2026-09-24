import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function ResumeHistory(){


    const [resumes,setResumes] = useState([]);

    const navigate = useNavigate();



    const userId =
        localStorage.getItem("userId");






    useEffect(()=>{

        loadResumes();

    },[]);







    const loadResumes = async()=>{


        try{


            const response = await API.get(

                `/resumes/user/${userId}`

            );


            setResumes(response.data);



        }
        catch(error){


            console.log(error);


        }


    };







    const deleteResume = async(id)=>{


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this resume?"
            );



        if(!confirmDelete){

            return;

        }





        try{


            await API.delete(

                `/resumes/${id}`

            );



            setResumes(

                resumes.filter(
                    resume => resume.id !== id
                )

            );



        }
        catch(error){


            console.log(error);


            alert(
                "Delete failed"
            );


        }


    };








    return(


        <div className="resume-history">



            <h2>
                📂 My Uploaded Resumes
            </h2>






            {

            resumes.length === 0

            ?

            <p>
                No resumes uploaded yet.
            </p>



            :



            <div className="resume-history-grid">



            {

            resumes.map((resume)=>(



                <div

                    className="resume-card"

                    key={resume.id}

                >



                    <h3>
                        📄 {resume.fileName}
                    </h3>





                    <p>

                        Uploaded Date:

                    </p>


                    <span>

                        {
                        new Date(
                            resume.uploadedDate
                        ).toLocaleDateString()
                        }

                    </span>







                    <div className="resume-actions">





                        <button

                            className="analyze-resume-btn"

                            onClick={()=>{

                                localStorage.setItem(

                                    "resumeId",

                                    resume.id

                                );


                                navigate("/analyze");


                            }}

                        >

                            🤖 Analyze

                        </button>








                        <button

                            className="delete-resume-btn"

                            onClick={()=>deleteResume(resume.id)}

                        >

                            🗑 Delete

                        </button>





                    </div>




                </div>



            ))

            }



            </div>


            }





        </div>


    );


}



export default ResumeHistory;