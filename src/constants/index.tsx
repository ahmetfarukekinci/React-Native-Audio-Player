import { ICategoryButton } from "@types";
import { Art, Technology, General, Entertainment } from "@icons";
export const CategoryButtonsListData: ICategoryButton[] = [
  {
    id: "1",
    param: "art",
    Icon: <Art />,
    title: "Art",
  },
  {
    id: "2",
    param: "technology",
    Icon: <Technology />,
    title: "Technology",
  },
  {
    id: "3",
    param: "general",
    Icon: <General />,
    title: "General",
  },
  {
    id: "4",
    param: "entertainment",
    Icon: <Entertainment />,
    title: "Entertainment",
  },
];
