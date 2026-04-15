import { Router } from "express"
import { getPlan } from "./plan.controller.js"

const router = Router()

router.post("/", getPlan)

export default router