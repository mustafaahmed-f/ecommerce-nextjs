import { Button } from "@/app/_components/shadcn/button";
import DeleteProductIcon from "@/app/_icons/DeleteProductIcon";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { match } from "ts-pattern";
import { SignUpFormValues } from "./SignUpStepper";
interface props {
  setValue: UseFormSetValue<any>;
  onUploadComplete: (uploaded: boolean) => void;
  trigger: (s: string) => Promise<boolean>;
  watch: UseFormWatch<SignUpFormValues>;
  url: string;
  setUrl: (url: string) => void;
}

const ImageUploader = ({
  setValue,
  onUploadComplete,
  trigger,
  watch,
  url,
  setUrl,
}: props) => {
  const { 0: file, 1: setFile } = useState<null | File>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const isFileUploaded = watch("profileImage");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  async function pinFileToIPFS() {
    try {
      setUploading(true);
      const formData = new FormData();

      // const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
      if (file) {
        formData.append("file", file);
      }

      const pinataMetadata = JSON.stringify({
        name: `${file?.name}_${Date.now()}_${watch("userName")}`,
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
        },
      );
      const response = await request.json();
      const url = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
      console.log(url);
      setUrl(url);
      toast({
        title: "Image uploaded successfully",
        variant: "success",
      });
      setUploading(false);
      onUploadComplete(true);
      setValue("profileImage", url);
      setValue("cid", response.IpfsHash);
      await trigger("profileImage");
      await trigger("cid");
      // console.log(response);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast({
        description: "Error uploading image",
        variant: "destructive",
      });
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    await pinFileToIPFS();
  };

  async function handleRemoveImage() {
    try {
      const response = await fetch(
        `https://api.pinata.cloud/pinning/unpin/${watch("cid")}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to unpin file");
      }

      toast({
        description: "Image removed successfully",
        variant: "success",
      });

      setUrl("");
      onUploadComplete(false);
      setValue("profileImage", "");
      setValue("cid", "");
      setFile(null);
      await trigger("profileImage");
      await trigger("cid");
    } catch (error) {
      console.error("Error unpinning file:", error);
      toast({
        description: "Error removing image",
        variant: "destructive",
      });
    }
  }

  return !isFileUploaded ? (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={(e) => handleFileChange(e)} />
      <Button
        onClick={handleUpload}
        disabled={uploading || !file}
        type="button"
        variant="default"
        color="inherit"
      >
        {match(uploading)
          .with(true, () => "Uploading...")
          .otherwise(() => "Upload Image")}
      </Button>
    </div>
  ) : (
    <div className="flex flex-row gap-7 max-sm:flex-col max-sm:gap-4">
      <div className="flex items-center gap-2">
        <Image width={50} height={50} src={url} alt="profile image" />
        <p>✅ Image uploaded successfully</p>
      </div>
      <button onClick={handleRemoveImage} type="button" title="Remove img">
        <DeleteProductIcon />
      </button>
    </div>
  );
};

export default ImageUploader;
