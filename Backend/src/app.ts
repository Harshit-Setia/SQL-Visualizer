import express from "express"
import parserRouter from "./modules/parse/parse.routes.js"
import planRoutes from "./modules/plan/plan.routes.js"
import morgan from "morgan"
import cors from "cors"
const app=express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/api/parse",parserRouter)
app.use("/api/plan", planRoutes)

export default app