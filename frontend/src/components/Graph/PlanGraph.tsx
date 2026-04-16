import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlanGraph = ({ nodes, edges }: any) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
};

export default PlanGraph;
