export function getAxiosErrMsg(error: any) {
  if (error?.response?.data) {
    return error.response.data?.message === "Validation failed"
      ? error.response.data.errors["code"]._errors[0]
      : error.response.data?.error || error.response.data?.message;
  }

  return error?.message || String(error);
}
