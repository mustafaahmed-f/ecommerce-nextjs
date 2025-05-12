export function getAxiosErrMsg(error: any) {
  const errorMsg =
    error.response.data?.message &&
    error.response.data?.message === "Validation failed"
      ? error.response.data.errors["code"]._errors[0]
      : error.response.data.error;
  return errorMsg;
}
