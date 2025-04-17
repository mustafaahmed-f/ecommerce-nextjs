import { NextRequest, NextResponse } from "next/server";
import { applyMiddlewares } from "./middlewares";

export function withMiddleWare({
  handler,
  middleWares = [],
  applyAuth = false,
}: {
  handler: (request: NextRequest) => Promise<NextResponse>;
  middleWares?: any[];
  applyAuth?: boolean;
}) {
  return async function (request: NextRequest) {
    const middleWare = await applyMiddlewares({
      request,
      applyAuth: applyAuth ?? false,
      middlewares: middleWares ?? [],
    });
    if (middleWare) return middleWare;

    return handler(request);
  };
}
