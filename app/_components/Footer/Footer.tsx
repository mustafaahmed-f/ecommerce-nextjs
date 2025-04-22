import { NearMeOutlined } from "@mui/icons-material";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";

function Footer() {
  return (
    <footer className="relative whitespace-nowrap sm:mt-28">
      <div className="absolute right-1/2 top-0 hidden w-fit translate-x-1/2 translate-y-[-50%] flex-col items-center gap-4 rounded-md bg-[#7296ab] px-6 py-3 sm:flex">
        <h2 className="text-3xl text-white">
          Luminae <span className="text-footer">Store</span>
        </h2>
        <p className="text-center text-white">
          Register your email not to miss the last minutes off+ Free delivery
        </p>
        <div className="relative w-fit">
          <input
            placeholder="Enter your email"
            className="rounded-sm py-2 pe-7 ps-2"
          />
          <div className="absolute inset-y-0 right-0 flex items-center justify-center">
            <NearMeOutlined />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-main">
          <div className="flex flex-col gap-y-[25px]">
            <p className="font-bold">Company</p>
            <ul className="flex list-none flex-col gap-[15px] capitalize">
              <li className="text-textGrey">About us</li>
              <li>Our store</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-[25px]">
            <p className="font-bold">Career opportunities</p>
            <ul className="flex list-none flex-col gap-[15px] capitalize">
              <li className="font-normal">Selling programs</li>
              <li>Advertise</li>
              <li>Cooperation</li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-[25px]">
            <p className="font-bold">How to buy</p>
            <ul className="flex list-none flex-col gap-[15px] capitalize">
              <li className="font-normal">Making payments</li>
              <li>Delivery Options</li>
              <li>Buyer Protection</li>
              <li>New user guide</li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-[25px]">
            <p className="font-bold">Help</p>
            <ul className="flex list-none flex-col gap-[15px] capitalize">
              <li className="font-normal">Contact Us</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col bg-white px-6 py-4">
        <div className="flex flex-row items-center justify-center gap-3 sm:mb-3 sm:border-b-2 sm:pb-2">
          <div>
            <Image
              width={300}
              height={300}
              alt="visa"
              className="h-4 w-14"
              src="/VISA.png"
            ></Image>
          </div>
          <div>
            <Image
              width={300}
              height={300}
              alt="mastercard"
              className="h-6 w-14"
              src="/mastercard.png"
            ></Image>
          </div>
          <div>
            <Image
              width={300}
              height={300}
              alt="paypal"
              className="h-6 w-16"
              src="/paypal.png"
            ></Image>
          </div>
        </div>
        <div className="hidden flex-row items-center justify-between sm:flex">
          <p>102 main st., Giza, Egypt</p>
          <p className="text-textGrey">
            @2025 copyright is reserved for Mustafa Ahmed
          </p>
          <div className="flex gap-2">
            <a className="cursor-pointer no-underline" href="">
              <InstagramIcon />
            </a>
            <div>{/* <FacebookRoundedIcon /> */}</div>
            <div>
              <NearMeOutlined />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
