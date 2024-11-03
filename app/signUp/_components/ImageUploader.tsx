import { pinata } from "@/utils/config";
import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
interface props {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  onUploadComplete: (uploaded: boolean) => void;
  file: any;
  setFile: (file: any) => void;
}

const ImageUploader = ({
  register,
  setValue,
  onUploadComplete,
  file,
  setFile,
}: props) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key");
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const urlRequest = await fetch("/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: upload.cid }),
      });
      const finalURL = await urlRequest.json();
      setUrl(finalURL);
      console.log(upload);
      setMessage("File uploaded successfully");
      setUploading(false);
      onUploadComplete(true);
      setValue("profileImage", url);
    } catch (e) {
      console.log(e);
      setUploading(false);
      setMessage("Trouble uploading file");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        {...register("image", {
          onChange: (e) => handleFileChange(e),
        })}
      />
      <button
        onClick={handleUpload}
        className="hover:text-teal-400"
        disabled={uploading || !file}
        type="button"
      >
        Upload Image
      </button>
      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
};

export default ImageUploader;
