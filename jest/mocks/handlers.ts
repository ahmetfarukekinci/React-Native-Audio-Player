import { rest } from "msw";
interface ILogin {
  email: string;
  password: string;
}
export const handlers = [
  rest.post("https://nox-podcast-api.vercel.app/login", (req, res, ctx) => {
    if (
      req.body.email === "test@example.com" &&
      req.body.password === "123456"
    ) {
      return res(ctx.json({ access_token: "asdkljalksdj" }));
    }
    return res(ctx.status(500));
  }),
];
