import { FaLightbulb } from "react-icons/fa";


function SuggestionsCard({suggestions}){


    return(

        <div className="section-card suggestions-card">


            <h4>

                <FaLightbulb />
                {" "}Suggestions

            </h4>



            <ul>

            {
                suggestions?.map(

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


export default SuggestionsCard;