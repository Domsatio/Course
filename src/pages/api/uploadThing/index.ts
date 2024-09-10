import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/controllers/uploadThing.controller";

export default createRouteHandler({
  router: ourFileRouter,
});

