export interface inputFieldType {
  type: "email" | "text" | "phone" | "dropdown";
  name: string;
  lable: string;
  fullWidth: boolean;
  required: boolean;
  placeholder: string;
  options?: string[] | string; //// options provided or a link to fetch options
  dependency?: string;
}
