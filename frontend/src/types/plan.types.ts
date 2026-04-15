export interface PlanNode {
  id: string
  type: string
  label: string
}

export interface PlanEdge {
  source: string
  target: string
}

export interface PlanData {
  nodes: PlanNode[]
  edges: PlanEdge[]
}