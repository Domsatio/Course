import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "@/controllers/uploadThing";

export default createRouteHandler({
  router: ourFileRouter,
//  config : {
//     uploadthingSecret: process.env.UPLOADTHING_SECRET as string,
//   },
});

