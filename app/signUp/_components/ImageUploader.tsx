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

  async function pinFileToIPFS() {
    try {
      setUploading(true);
      const formData = new FormData();

      // const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
      formData.append("file", file);

      const pinataMetadata = JSON.stringify({
        name: file.name,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const response = await request.json();
      const url = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
      console.log(url);
      setUrl(url);
      setMessage("File uploaded successfully");
      setUploading(false);
      onUploadComplete(true);
      setValue("profileImage", url);
      setValue("cid", response.IpfsHash);
      await trigger("profileImage");
      console.log(response);
    } catch (error) {
      console.log(error);
      setUploading(false);
      setMessage("Trouble uploading file");
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    await pinFileToIPFS();
    // try {
    //   setUploading(true);
    //   const keyRequest = await fetch(`/api/key`);
    //   const keyData = await keyRequest.json();
    //   const upload = await pinata.upload
    //     .file(file)
    //     .key(keyData.JWT)
    //     .addMetadata({
    //       name: file.name,
    //       keyvalues: {
    //         customKey: "customValue",
    //       },
    //     });

    //   const urlRequest = await fetch(`/api/sign`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ cid: upload.cid }),
    //   });
    //   const finalURL = await urlRequest.json();
    //   setUrl(finalURL);
    //   setMessage("File uploaded successfully");
    //   setUploading(false);
    //   onUploadComplete(true);
    //   setValue("profileImage", finalURL);
    //   setValue("cid", upload.cid);
    //   await trigger("profileImage");
    // } catch (e) {
    //   console.log(e);
    //   setUploading(false);
    //   setMessage("Trouble uploading file");
    // }
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
