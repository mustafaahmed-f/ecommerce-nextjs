import { getUserFromCookies } from "../_lib/getUserFromCookies";
import InitialDataProvider from "./InitialDataProvider";

interface AuthHandlerProps {
  children: React.ReactNode;
}

async function AuthHandler({
  children,
  // intitialCategories,
  // initialProducts,
}: AuthHandlerProps) {
  const user = await getUserFromCookies();

  return <InitialDataProvider user={user}>{children}</InitialDataProvider>;
}

export default AuthHandler;
