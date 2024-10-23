import React, { ParamHTMLAttributes } from "react";

interface PageProps {
  params: any;
}

function Page({ params }: PageProps) {
  return <div>{params.id}</div>;
}

export default Page;
