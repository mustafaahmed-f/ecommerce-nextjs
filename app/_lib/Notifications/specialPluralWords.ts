import { ModulesArray } from "../ModulesArray";

export const specialPluralWords: {
  originalWord: (typeof ModulesArray)[number];
  single: string;
}[] = [
  {
    originalWord: "categories",
    single: "Category",
  },
];
