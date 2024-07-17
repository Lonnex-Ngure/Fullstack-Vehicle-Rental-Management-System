import { Hono } from "hono";
import {
  listVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "./vehicles.controller";
import { zValidator } from "@hono/zod-validator";
import { vehicleSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth"; 

export const vehicleRouter = new Hono();

vehicleRouter.get("/vehicles",  listVehicles); 
vehicleRouter.get("/vehicles/:id", getVehicleById); 
vehicleRouter.post("/vehicles", zValidator("json", vehicleSchema), createVehicle); 
vehicleRouter.put("/vehicles/:id", zValidator("json", vehicleSchema), updateVehicle); 
vehicleRouter.delete("/vehicles/:id", deleteVehicle); 
