import { FaCheckCircle } from "react-icons/fa";


function StrengthCard({strengths}){


    return(

        <div className="section-card strength-card">


            <h4>
                <FaCheckCircle /> Strengths
            </h4>


            <ul>

            {
                strengths?.map(
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


export default StrengthCard;