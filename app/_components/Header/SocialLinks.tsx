import FacebookIcon from "@/app/_icons/FacebookIcon";
import InstagramSVG from "@/app/_icons/InstagramSVG";
import NearMeOutlinedSVG from "@/app/_icons/NearMeOutlinedSVG";

interface SocialLinksProps {}

function SocialLinks({}: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="cursor-pointer text-neutral-400 no-underline hover:text-sky-600">
        <InstagramSVG />
      </span>
      <span className="cursor-pointer text-neutral-400 no-underline hover:text-sky-600">
        <FacebookIcon />
      </span>
      <span className="cursor-pointer text-neutral-400 no-underline hover:text-sky-600">
        <NearMeOutlinedSVG />
      </span>
    </div>
  );
}

export default SocialLinks;
