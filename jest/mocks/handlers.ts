import { rest } from "msw";
import { IPlayerScreeenParams } from "../../src/navigation/index";
export const handlers = [
  rest.post("https://nox-podcast-api.vercel.app/login", (req, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.get("https://nox-podcast-api.vercel.app/search", (req, res, ctx) => {
    return res(
      ctx.json<IPlayerScreeenParams[]>([
        {
          audio_url: "url",
          author: "author",
          category: "category",
          description: "description",
          dislikes: 12,
          file_size: 123,
          likes: 11,
          title: "title",
        },
      ])
    );
  }),
];
