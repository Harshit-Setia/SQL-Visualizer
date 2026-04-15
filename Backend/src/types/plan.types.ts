export type NodeType= "SCAN" | "FILTER" | "PROJECTION" | "JOIN"

export interface PlanNode{
    id:string,
    type:NodeType,
    label:string
}

export interface PlanEdge{
    source: string,
    target: string
}

export interface PlanData{
    nodes: PlanNode[]
    edges: PlanEdge[]
}