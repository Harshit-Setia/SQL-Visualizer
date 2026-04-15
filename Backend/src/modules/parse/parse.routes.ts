import { Router } from "express";
import { parseQuery } from "./parse.controller.js";

const router = Router()

router.post("/",parseQuery)

export default router