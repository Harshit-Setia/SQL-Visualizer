/* eslint-disable @typescript-eslint/no-explicit-any */
export const transformPlan = (plan: any) => {
  const nodes = plan.nodes.map((n: any, i: number) => ({
    id: n.id,
    type: 'custom',
    data: { label: n.label, type: n.type, rows: n.rows, cost: n.cost },
    position: { x: i * 250, y: i * 120 }, // Minimal basic layouting for start
  }));

  const edges = plan.edges.map((e: any) => ({
    id: `${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
    type: 'smoothstep',
    animated: true,
  }));

  return { nodes, edges };
};
