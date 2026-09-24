import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


function ATSCard({score}){


    const [count,setCount] = useState(0);



    useEffect(()=>{


        let start = 0;


        const timer = setInterval(()=>{


            start += 1;


            setCount(start);



            if(start >= score){

                clearInterval(timer);

            }


        },20);



        return ()=>clearInterval(timer);


    },[score]);





    const getStatus = ()=>{


        if(score >= 80){

            return "Excellent Resume 🚀";

        }

        else if(score >= 60){

            return "Good Resume 👍";

        }

        else{

            return "Needs Improvement ⚠️";

        }

    };







    return(


        <div className="ats-card">



            <h3>
                📊 ATS Score
            </h3>





            <div className="ats-circle">


                <CircularProgressbar


                    value={count}


                    text={`${count}%`}



                    styles={buildStyles({


                        textSize:"18px",



                        pathColor:
                        score >=80
                        ?
                        "#16a34a"
                        :
                        score>=60
                        ?
                        "#eab308"
                        :
                        "#dc2626",




                        textColor:"#111827",


                        trailColor:"#e5e7eb"



                    })}



                />



            </div>







            <div className="score-status">


                {getStatus()}


            </div>





        </div>


    );


}


export default ATSCard;