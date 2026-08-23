import { handleAgentRequest } from "../../src/agent/negotiate.js";

export default async (request: Request, context: { next: () => Promise<Response> }) => {
  return handleAgentRequest(request, context);
};

export const config = {
  path: "/*",
  excludedPath: ["/images/*", "/static/*", "/css/*"],
  excludedPattern: /\.(?:css|js|mjs|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot)$/i,
  method: ["GET", "HEAD"],
};
