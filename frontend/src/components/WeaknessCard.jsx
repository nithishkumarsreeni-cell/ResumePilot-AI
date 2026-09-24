import { FaExclamationTriangle } from "react-icons/fa";


function WeaknessCard({weaknesses}){


    return(

        <div className="section-card weakness-card">


            <h4>

                <FaExclamationTriangle />
                {" "}Weaknesses

            </h4>



            <ul>

            {
                weaknesses?.map(

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


export default WeaknessCard;