import { pinata } from "@/utils/config";
import { Button } from "@mui/material";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { match } from "ts-pattern";
interface props {
  setValue: UseFormSetValue<any>;
  onUploadComplete: (uploaded: boolean) => void;
  file: any;
  setFile: (file: any) => void;
  trigger: (s: string) => Promise<boolean>;
}

const ImageUploader = ({
  setValue,
  onUploadComplete,
  file,
  setFile,
  trigger,
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
      const keyRequest = await fetch(`/api/key`);
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      const urlRequest = await fetch(`/api/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: upload.cid }),
      });
      const finalURL = await urlRequest.json();
      setUrl(finalURL);
      setMessage("File uploaded successfully");
      setUploading(false);
      onUploadComplete(true);
      setValue("profileImage", finalURL);
      setValue("cid", upload.cid);
      await trigger("profileImage");
    } catch (e) {
      console.log(e);
      setUploading(false);
      setMessage("Trouble uploading file");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={(e) => handleFileChange(e)} />
      <Button
        onClick={handleUpload}
        disabled={uploading || !file}
        type="button"
        variant="contained"
        color="inherit"
      >
        {match(uploading)
          .with(true, () => "Uploading...")
          .otherwise(() => "Upload Image")}
      </Button>
      {message && <p className="text-green-400">{message}</p>}
    </div>
  );
};

export default ImageUploader;
