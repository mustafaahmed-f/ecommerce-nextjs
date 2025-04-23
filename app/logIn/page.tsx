import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AuthForm from "../_components/Auth/AuthForm";

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
    <div className="mt-10 flex items-center justify-center gap-3 px-12">
      <div className="hidden w-1/2 p-4 sm:flex-col sm:items-center md:flex">
        <h2 className="mb-3 text-center text-3xl font-bold">
          Log in and get started with the best shopping experience
        </h2>
        {mainPragraphs.map((el, i) => (
          <div
            key={i}
            className="my-4 flex items-center gap-3 text-lg font-semibold"
          >
            {i === 0 && <SettingsIcon />}
            {i === 1 && <ThumbUpIcon />}
            {i === 2 && <FavoriteIcon />}
            {i === 3 && <AutoFixHighIcon />}
            <p>{el}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col justify-center bg-primary-200 px-2 py-5 sm:px-3 md:w-1/2">
        <div className="my-auto rounded-md bg-white bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl lg:py-10">
          <h2 className="mb-10 text-3xl font-semibold lg:text-4xl">Sign in</h2>

          <AuthForm
            fields={fieldsArr}
            purpose={"Sign in"}
            extraField={"Dont' have acccount ?"}
            extraLink="/signup"
            defaultValues={{
              email: "mustafafikry97@gmail.com",
              password: "Aaaa@123",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
