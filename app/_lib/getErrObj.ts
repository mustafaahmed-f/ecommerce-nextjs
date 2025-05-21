import { get } from "lodash";
import { Path } from "react-hook-form";

export function getErrObject<T>(errors: any, name: Path<T>) {
  return get(errors, name);
}
