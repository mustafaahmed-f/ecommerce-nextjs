import { NextRequest } from "next/server";

export default async function middleware() {
  // let protectedRoutes = ["/loginsignup"];
  // let url = req.nextUrl.pathname;
  // if (protectedRoutes.includes(url)) {
  //   const cookie = req.headers.get("cookie");
  //   if (cookie && cookie.includes("token")) {
  //     const token = cookie.split("token=")[1].split(";")[0];
  //     if (token) {
  //       const decoded = verifyToken({ token });
  //       if (decoded && (decoded as any).id) {
  //         NextResponse.redirect("/main");
  //       }
  //     }
  //   }
  // }
  // const responseOfMiddlewares = await applyMiddlewares({
  //   request: req,
  //   middlewares: [],
  //   applyAuth: true,
  // });
  // if (responseOfMiddlewares) {
  //   return responseOfMiddlewares;
  // }
  // return NextResponse.next();
}

// export const config = {
//   matcher: ["/loginsignup", "/user/**"],
// };
