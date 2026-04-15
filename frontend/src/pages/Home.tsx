import { useState } from "react"
import SqlEditor from "../components/Editor/SqlEditor"
import PlanGraph from "../components/Graph/PlanGraph"
import { getPlan } from "../services/api"
import { transformPlan } from "../utils/transform"

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [graph, setGraph] = useState<any>(null)

  const handleRun = async (query: string) => {
    const plan = await getPlan(query)
    const transformed = transformPlan(plan)
    setGraph(transformed)
  }

  return (
    <div>
      <SqlEditor onRun={handleRun} />
      {graph && <PlanGraph {...graph} />}
    </div>
  )
}

export default Home