import { actions } from "../actions";
import { ModulesArray } from "../ModulesArray";
import { GetFinalModuleName } from "./GetFinalModuleName";

export function GenerateEvents(
  module: (typeof ModulesArray)[number],
  action: (typeof actions)[keyof typeof actions],
) {
  const finalModule = GetFinalModuleName(module);

  return `${finalModule}_${action}`;
}
