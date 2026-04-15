import { Request, Response } from "express"
import { parseSQL } from "../parse/parse.service.js"
import { generatePlan } from "./plan.service.js"
import { ApiResponse } from "../../types/api.types.js"
import { PlanData } from "../../types/plan.types.js"

export const getPlan = (req: Request, res: Response) => {
  try {
    const { query } = req.body as { query: string }

    if (!query) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Query is required"
      }
      return res.status(400).json(response)
    }

    const ast = parseSQL(query)
    const plan = generatePlan(ast)

    const response: ApiResponse<PlanData> = {
      success: true,
      data: plan
    }

    return res.status(200).json(response)
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message
    }

    return res.status(400).json(response)
  }
}