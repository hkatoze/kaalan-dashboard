import "./FilePicker.css";
import IMG_ICON from "../assets/img-icon.png";
import PDF_ICON from "../assets/pdf-icon.png";
import VIDEO_ICON from "../assets/video-icon.png";
import AUDIO_ICON from "../assets/audio-icon.png";
import OTHER_ICON from "../assets/other-icon.png";
import { ChangeEvent, useState } from "react";
import { UploadClient } from "@uploadcare/upload-client";
import axios from "axios";
import { endpoint } from "../constants";

interface ImagePickerProps {
  indication?: string;
  width?: number;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  required?: boolean;
  file: "image" | "video" | "audio" | "pdf" | "other";
}

const ImagePicker = ({
  indication,
  width,
  file,
  setUrl,
  name,
  required,
}: ImagePickerProps) => {
  const icons = {
    image: IMG_ICON,
    video: VIDEO_ICON,
    audio: AUDIO_ICON,
    pdf: PDF_ICON,
    other: OTHER_ICON,
  };
  const [filePickerUrl, setFilePickerUrl] = useState(icons[file]);
  const [filePicker, setFilePicker] = useState<File | null>(null);
  const [displayIndication, setDisplayIndication] = useState(true);

  //============>UploadCare API==========================================
  const client = new UploadClient({ publicKey: "324bafb9dd613b7a4266" });
  const uploadFileOnUploadCare = (fileData: any) => {
    client.uploadFile(fileData).then((file) => {
      setUrl(`https://ucarecdn.com/${file.uuid}/`);
    });
  };
  //=========================================================================

  //============>Upload on Firebase==========================================
  const uploadFileFirebaseStorage = async function (file: File) {
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(
        `${endpoint}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjA1MDIzOSwiZXhwIjoxNzMzNTg2MjM5fQ.vlAMLEwlVnkDYZRt5pz9QqaJtWoenAbf76gvrcNBSHk`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      console.log(data);
      setUrl(data.url);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    }
  };
  //=========================================================================

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filePicked = event.target.files[0];
      setFilePicker(filePicked);

      const url = URL.createObjectURL(filePicked);

      if (file === "image") {
        uploadFileOnUploadCare(filePicked);
        setFilePickerUrl(url);
        setUrl(url);
      } else {
        uploadFileFirebaseStorage(filePicked);
      }

      setDisplayIndication(false);
    }
  };

  return (
    <div className="imagePicker">
      <div className="inputDiv">
        <label
          className="imageBox"
          style={{
            width: `${width || 10}rem`,
          }}
          htmlFor={`imagePicker${name}`}
        >
          <img
            src={file === "image" ? filePickerUrl : icons[file]}
            style={{
              maxWidth: `${width! / 5.6 || 10 / 4}rem`,
              maxHeight: `${width! / 5.6 || 10 / 4}rem`,
              minHeight: `${width! / 5.6 || 10 / 4}rem`,
            }}
            alt="image icon"
          />
          {displayIndication ? (
            <span>{indication || `Upload a file`} </span>
          ) : (
            <span> {filePicker?.name} </span>
          )}
        </label>

        {file === "pdf" ? (
          <input
            type="file"
            name={name}
            id={`imagePicker${name}`}
            placeholder=""
            accept=".doc, .docx, .pdf"
            onChange={handleChange}
            required={required || false}
          />
        ) : (
          <input
            type="file"
            name={name}
            id={`imagePicker${name}`}
            placeholder=""
            accept={`${file}/*`}
            onChange={handleChange}
            required={required || false}
          />
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
