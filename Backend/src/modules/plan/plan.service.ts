import { NodeType, PlanData, PlanEdge, PlanNode } from "../../types/plan.types.js"
import { SelectAST } from "../../types/ast.types.js"

export const generatePlan = (rawAst: unknown): PlanData => {
  const ast = rawAst as SelectAST

  const nodes:PlanNode[] = []
  const edges:PlanEdge[] = []

  let id = 1

  const createNode = (type: NodeType, label: string) => {
    const node:PlanNode = {
      id: String(id++),
      type,
      label
    }
    nodes.push(node)
    return node.id
  }

  // 🔹 SCAN for first table
  const firstTable = ast.from[0].table
  let lastNodeId = createNode("SCAN", `Table Scan: ${firstTable}`)

  // 🔥 HANDLE JOINS
  for (let i = 1; i < ast.from.length; i++) {
    const tableObj = ast.from[i]

    const rightTableId = createNode(
      "SCAN",
      `Table Scan: ${tableObj.table}`
    )
    
    const joinCondition = tableObj.on ? parseExpr(tableObj.on):""
    const joinType =tableObj.join?.join || "JOIN"
    const joinId = createNode("JOIN", `${joinType} ON ${joinCondition}`)

    // connect both tables to join
    edges.push({ source: lastNodeId, target: joinId })
    edges.push({ source: rightTableId, target: joinId })

    lastNodeId = joinId
  }

  // 🔹 WHERE → FILTER
  if (ast.where) {
    const filterCondition=parseExpr(ast.where)
    const filterId = createNode("FILTER", filterCondition)

    edges.push({
      source: lastNodeId,
      target: filterId
    })

    lastNodeId = filterId
  }

  // 🔹 SELECT → PROJECTION
  const columns =
    ast.columns === "*"
      ? "*"
      : ast.columns.map(c => c.expr.column).join(", ")

  const projId = createNode(
    "PROJECTION",
    `SELECT ${columns}`
  )

  edges.push({
    source: lastNodeId,
    target: projId
  })

  return { nodes, edges }
}

const parseExpr=(expr:any):string=>{
  if(!expr) return ""

  if(expr.type==="binary_expr"){
    const left=parseExpr(expr.left)
    const right=parseExpr(expr.right)

    return `${left} ${expr.operator} ${right}`
  }

  if(expr.type==="column_ref"){
    return expr.table?
           `${expr.table}.${expr.column}`:
           expr.column
  }

  if(expr.type==="number"){
    return expr.value
  }

  if(expr.type==="string"){
    return `'${expr.value}'`
  }

  return ""
}