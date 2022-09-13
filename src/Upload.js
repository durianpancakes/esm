import React, {useState} from 'react';
import {Alert} from "react-bootstrap";

function Upload() {
    const [file, setFile] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success");
    const [alertText, updateAlertText] = useState("");

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSuccess = () => {
        setAlertVariant("success");
        updateAlertText("Upload is successful!")
        setShowAlert(true);
    }

    const handleFailure = (error) => {
        setAlertVariant("danger");
        updateAlertText(error);
        setShowAlert(true);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const formData = new FormData();
                formData.append("file", file)
                const requestOptions = {
                    method: 'POST',
                    header: {'Content-Type': 'multipart/form-data'},
                    body: formData
                }
                fetch('http://127.0.0.1:5000/users/upload', requestOptions)
                    .then(response => response.json()
                        .then(response => (response['success'] === true)
                            ? handleSuccess() : handleFailure(response['error'])));
            };

            fileReader.readAsText(file);
        }
    };

    return(
        <div style={{textAlign: "left"}}>
            <div style={{padding: '16px', fontWeight: 'bold', fontSize: "x-large"}}>Upload</div>
            <Alert variant={alertVariant} style={{padding: '16px'}} show={showAlert}>{alertText}</Alert>
            <form style={{padding: '16px'}}>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />
                <button
                    onClick={(e) => {
                        handleOnSubmit(e)
                    }}
                >
                    Import
                </button>
            </form>
        </div>
    );
}

export default Upload;