import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { NearMeOutlined } from "@mui/icons-material";
import FacebookIcon from "@/app/_icons/facebookIcon";

interface SocialLinksProps {}

function SocialLinks({}: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <a
        className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400"
        href=""
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <InstagramIcon />
      </a>
      <a
        className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400"
        href=""
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <FacebookIcon />
      </a>
      <a
        className="no-underline cursor-pointer hover:text-sky-600 text-neutral-400"
        href=""
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <NearMeOutlined />
      </a>
    </div>
  );
}

export default SocialLinks;
