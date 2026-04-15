/* eslint-disable @typescript-eslint/no-explicit-any */
export const transformPlan = (plan: any) => {
  const nodes = plan.nodes.map((n: any, i: number) => ({
    id: n.id,
    data: { label: n.label },
    position: { x: i * 200, y: 100 }
  }))

  const edges = plan.edges.map((e: any) => ({
    id: `${e.source}-${e.target}`,
    source: e.source,
    target: e.target
  }))

  return { nodes, edges }
}