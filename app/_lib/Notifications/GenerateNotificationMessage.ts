import { actions } from "../actions";
import { ModulesArray } from "../ModulesArray";
import { GetFinalModuleName } from "./GetFinalModuleName";

export function GenerateNotificationMessage(
  module: (typeof ModulesArray)[number],
  title: string,
  action: keyof typeof actions,
) {
  const finalModule = GetFinalModuleName(module);

  return `${finalModule} '${title}' has been ${action} successfully !`;
}
