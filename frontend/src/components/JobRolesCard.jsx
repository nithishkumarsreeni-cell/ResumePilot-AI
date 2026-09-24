function JobRolesCard({roles}){


    return(

        <div className="section-card job-roles-card">


            <h4>
                💼 Suitable Job Roles
            </h4>



            <div className="role-container">


            {
                roles?.map(
                    (role,index)=>(

                        <div
                            className="role-card"
                            key={index}
                        >

                            {role}

                        </div>

                    )
                )
            }


            </div>



        </div>

    );


}


export default JobRolesCard;