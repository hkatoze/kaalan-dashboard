import "./FilePicker.css";
import IMG_ICON from "../assets/img-icon.png";
import PDF_ICON from "../assets/pdf-icon.png";
import VIDEO_ICON from "../assets/video-icon.png";
import AUDIO_ICON from "../assets/audio-icon.png";
import OTHER_ICON from "../assets/other-icon.png";
import { ChangeEvent, useState } from "react";
import { UploadClient } from "@uploadcare/upload-client";
import { put } from "@vercel/blob";

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
  useState();
  const [displayIndication, setDisplayIndication] = useState(true);

  //============>UploadCare API==========================================
  const client = new UploadClient({ publicKey: "324bafb9dd613b7a4266" });
  const uploadFileOnUploadCare = (fileData: any) => {
    client.uploadFile(fileData).then((file) => {
      setUrl(`https://ucarecdn.com/${file.uuid}/`);
    });
  };
  //=========================================================================

  //============>UploadVercel API==========================================
  const uploadFileOnVercelBlob = async function (file: File) {
    const blob = await put(file.name, file, { access: "public" });
    const url = Response.json(blob).url;
    setUrl(url);
  };
  //=========================================================================

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filePicked = event.target.files[0];
      setFilePicker(filePicked);

      const url = URL.createObjectURL(filePicked);

      if (file == "pdf") {
        uploadFileOnVercelBlob(filePicked);
      } else {
        uploadFileOnUploadCare(filePicked);

        setFilePickerUrl(url);
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
            src={file == "image" ? filePickerUrl : icons[file]}
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

        {file == "pdf" ? (
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
