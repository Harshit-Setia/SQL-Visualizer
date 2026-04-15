import ReactFlow from "reactflow"
import "reactflow/dist/style.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlanGraph = ({ nodes, edges }: any) => {
  return (
    <div style={{ height: "500px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  )
}

export default PlanGraph