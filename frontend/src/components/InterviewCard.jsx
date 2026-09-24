import { FaUserTie } from "react-icons/fa";


function InterviewCard({questions}){


    return(

        <div className="section-card interview-card">


            <h4>

                <FaUserTie />
                {" "}Interview Questions

            </h4>



            <ol>

            {
                questions?.map(

                    (item,index)=>(

                        <li key={index}>
                            {item}
                        </li>

                    )

                )
            }

            </ol>


        </div>

    );

}


export default InterviewCard;