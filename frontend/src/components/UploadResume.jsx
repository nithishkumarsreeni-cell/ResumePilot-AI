import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function UploadResume() {


    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");

    const [uploading, setUploading] = useState(false);

    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();


    const handleFile = (selectedFile) => {


        if (selectedFile && selectedFile.type === "application/pdf") {


            setFile(selectedFile);

            setMessage("");


        }
        else {


            setMessage(
                "Please upload only PDF files"
            );


        }


    };


    const handleDrop = (e) => {


        e.preventDefault();


        const droppedFile =
            e.dataTransfer.files[0];


        handleFile(droppedFile);


    };


    const handleDragOver = (e) => {


        e.preventDefault();


    };


    const handleUpload = async () => {


        const userId =
            localStorage.getItem("userId");


        if (!userId) {


            setMessage(
                "Please login before uploading a resume"
            );


            return;


        }


        if (!file) {


            setMessage(
                "Please select a PDF resume"
            );


            return;


        }


        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        // Send the logged-in user's ID automatically

        formData.append(
            "userId",
            userId
        );


        try {


            setUploading(true);

            setMessage("");


            const response = await API.post(

                "/resumes/upload",

                formData,

                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data"

                    }
                }

            );


            localStorage.setItem(

                "resumeId",

                response.data.id

            );


            setSuccess(true);


            setMessage(
                "Resume uploaded successfully ✅"
            );


            setTimeout(() => {


                navigate("/analyze");


            }, 1500);


        }
        catch (error) {


            console.log(error);


            setMessage(
                error.response?.data?.message ||
                error.response?.data ||
                "Upload failed"
            );


        }
        finally {


            setUploading(false);


        }


    };


    return (


        <div className="upload-card">


            <h2>
                📄 Upload Resume
            </h2>


            <p>
                Upload your PDF resume to get AI-powered analysis.
            </p>


            <div

                className="drop-area"

                onDrop={handleDrop}

                onDragOver={handleDragOver}

                onClick={() =>
                    document
                        .getElementById("fileInput")
                        .click()
                }

            >


                <input

                    id="fileInput"

                    type="file"

                    accept=".pdf"

                    onChange={(e) =>
                        handleFile(
                            e.target.files[0]
                        )
                    }

                />


                <p>
                    📂 Drag & Drop PDF here
                </p>


                <span>
                    or click to browse
                </span>


            </div>


            {

                file && (

                    <div className="file-preview">

                        📄 {file.name}

                        <br />

                        <small>

                            {(file.size / 1024)
                                .toFixed(2)} KB

                        </small>

                    </div>

                )

            }


            <button

                className="upload-btn"

                onClick={handleUpload}

                disabled={uploading}

            >


                {

                    uploading

                        ?

                        "Uploading..."

                        :

                        "Upload Resume"

                }


            </button>


            {

                success && (

                    <div className="success-animation">

                        ✅

                    </div>

                )

            }


            <p className="message">

                {message}

            </p>


        </div>


    );


}


export default UploadResume;