import { Hono } from "hono";
import {
  listAuthentications,
  getAuthenticationById,
  createAuthentication,
  updateAuthentication,
  deleteAuthentication,
} from "./authentications.controller";
import { zValidator } from "@hono/zod-validator";
import { authenticationSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";

export const authenticationRouter = new Hono();

authenticationRouter.get("/authentications", adminRoleAuth, listAuthentications);
authenticationRouter.get("/authentications/:id", adminRoleAuth, getAuthenticationById);
authenticationRouter.post("/authentications", adminRoleAuth, zValidator("json", authenticationSchema), createAuthentication);
authenticationRouter.put("/authentications/:id", adminRoleAuth, zValidator("json", authenticationSchema), updateAuthentication);
authenticationRouter.delete("/authentications/:id", adminRoleAuth, deleteAuthentication);
