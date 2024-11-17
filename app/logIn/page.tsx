import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AuthForm from "../_components/Auth/AuthForm";
import { Providers } from "../Providers";

interface PageProps {}

const mainPragraphs = [
  "Discover a wide range of high-quality products carefully curated to meet your needs, from the latest electronics to everyday essentials.",
  "Enjoy fast, reliable shipping and top-notch customer service that ensures a seamless shopping experience every time you visit.",
  "Shop with confidence knowing you're getting the best deals on the market, with unbeatable prices and special discounts available every week.",
  "Your satisfaction is our priority. We offer a hassle-free return policy and dedicated support to make your shopping experience stress-free and enjoyable.",
];

function Page({}: PageProps) {
  const fieldsArr = [
    { field: "email", label: "Email" },
    { field: "password", label: "Password" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 mt-10 px-12">
      <div className="hidden w-1/2 p-4 md:flex sm:flex-col sm:items-center">
        <h2 className="mb-3 text-3xl font-bold text-center">
          Log in and get started with the best UI experience
        </h2>
        {mainPragraphs.map((el, i) => (
          <div
            key={i}
            className="flex items-center gap-3 my-4 text-lg font-semibold"
          >
            {i === 0 && <SettingsIcon />}
            {i === 1 && <ThumbUpIcon />}
            {i === 2 && <FavoriteIcon />}
            {i === 3 && <AutoFixHighIcon />}
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center w-full px-2 py-5 bg-primary-200 md:w-1/2 sm:px-3">
        <div className="my-auto bg-white rounded-md bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
          <h2 className="mb-10 text-3xl font-semibold lg:text-4xl">Sign in</h2>
          <Providers>
            <AuthForm
              fields={fieldsArr}
              purpose={"Sign in"}
              extraField={"Dont' have acccount ?"}
              extraLink="/signup"
              defaultValues={{
                email: "mostafafikry97@gmail.com",
                password: "Aaaa@123",
              }}
            />
          </Providers>
        </div>
      </div>
    </div>
  );
}

export default Page;
