import { server } from "./mocks/server";
import "@testing-library/jest-native";
// Establish API mocking before all tests.
//@ts-ignore
// const nodeFetch = require("node-fetch");
// //@ts-ignore
// global.fetch = nodeFetch;
// //@ts-ignore
// global.Request = nodeFetch.Request;

import fetch, { Headers, Request, Response } from "node-fetch";
import AbortController from "abort-controller";
global.fetch = fetch as any;
global.Headers = Headers as any;
global.Request = Request as any;
global.Response = Response as any;
global.AbortController = AbortController;
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

process.on("unhandledRejection", (error) => {
  // eslint-disable-next-line no-undef
  fail(error);
});
