import { ModulesArray } from "../ModulesArray";
import { specialPluralWords } from "./specialPluralWords";

export function GetFinalModuleName(module: (typeof ModulesArray)[number]) {
  const CapitalizedModuleName =
    module.charAt(0).toUpperCase() + module.slice(1);
  const SingleWord = CapitalizedModuleName.slice(
    0,
    CapitalizedModuleName.length - 1,
  );
  const finalModule = specialPluralWords.find(
    (item) => item.originalWord === module,
  )
    ? specialPluralWords.find((item) => item.originalWord === module)!.single
    : SingleWord;

  return finalModule;
}
