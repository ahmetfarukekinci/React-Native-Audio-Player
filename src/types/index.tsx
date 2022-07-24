export type CategoryParamType = "art" | "technology" | "general" | "entertainment" | "" | undefined;
export interface ICategoryButton {
  id: string;
  title: string;
  param: CategoryParamType;
  Icon?: JSX.Element;
}
