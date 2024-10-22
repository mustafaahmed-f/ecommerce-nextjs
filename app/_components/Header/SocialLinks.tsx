import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { NearMeOutlined } from "@mui/icons-material";
import FacebookIcon from "@/app/_icons/FacebookIcon";

interface SocialLinksProps {}

function SocialLinks({}: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400">
        <InstagramIcon />
      </span>
      <span className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400">
        <FacebookIcon />
      </span>
      <span className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400">
        <NearMeOutlined />
      </span>
    </div>
  );
}

export default SocialLinks;
