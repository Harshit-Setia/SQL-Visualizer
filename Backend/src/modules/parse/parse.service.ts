import NodeSqlParser from "node-sql-parser"
import { ApiResponse } from "../../types/api.types.js"

const parser=new NodeSqlParser.Parser()

export const parseSQL=(query:string):object=>{
    return parser.astify(query)
}