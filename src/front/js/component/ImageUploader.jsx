import React, { useState } from 'react';

export const ImageUploader = ({ token, onUploadSuccess }) => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const postImage = async (imageFile, token) => {
        const uri = `${process.env.BACKEND_URL}/api/upload`;

        const formData = new FormData();
        formData.append('image', imageFile);

        const options = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        };
        try {
            const response = await fetch(uri, options);
            if (!response.ok) {
                console.error("wrong on the backend", response.status, response.statusText);
                setUploadStatus("Error uploading");
                return null;
            }
            const data = await response.json();
            setUploadStatus("uploading success");
            if (onUploadSuccess) {
                onUploadSuccess(data.results);
            }
            return data;
        } catch (error) {
            console.error("Request error :", error);
            setUploadStatus("Request error");
            return null;
        }
    };
    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);
    };
    const handleUpload = () => {
        if (!imageFile) {
            alert('pick an image');
            return;
        }
        postImage(imageFile, token);
    };
    return (
        <div>
            <h1>Upload image</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir</button>

            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

