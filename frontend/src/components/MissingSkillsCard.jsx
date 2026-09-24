function MissingSkillsCard({skills}){


    return(

        <div className="section-card missing-skills-card">


            <h4>
                📚 Missing Skills
            </h4>


            <div className="chip-container">


            {
                skills?.map(
                    (skill,index)=>(

                        <span
                            className="skill-chip"
                            key={index}
                        >
                            {skill}
                        </span>

                    )
                )
            }


            </div>


        </div>

    );


}


export default MissingSkillsCard;