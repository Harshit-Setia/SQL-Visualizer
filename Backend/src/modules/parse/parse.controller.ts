import { RequestHandler } from "express"
import * as parserService from "./parse.service.js"
import { ApiResponse } from "../../types/api.types.js"

type ParseData = {
  query: string
  ast: object
}

export const parseQuery:RequestHandler = (req, res) => {
  try {
    const { query } = req.body
    if (!query) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Query is required"
      }
      return res.status(400).json(response)
    }

    const ast = parserService.parseSQL(query)

    const response: ApiResponse<ParseData> ={
      success: true,
      data: {
        query,
        ast
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Something went wrong"
    }

    return res.status(400).json(response)
  }
}