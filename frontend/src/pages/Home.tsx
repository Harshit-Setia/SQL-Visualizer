import { useState } from "react";
import { SqlEditor } from "../components/Editor/SqlEditor";
import PlanGraph from "../components/Graph/PlanGraph";
import { getPlan } from "../services/api";
import { transformPlan } from "../utils/transform";
//importing lucid react icon
import { CirclePlus } from "lucide-react";

// Internal Sub-components to keep the main component clean
const StatCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) => (
  <div className="relative bg-surface-low p-6 rounded-lg border border-surface-bright/5">
    {/* The actual Card Content */}
    <p className="font-display text-[9px] uppercase tracking-[0.4em] text-white/30 mb-2">
      {label}
    </p>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-4xl font-bold text-primary">
        {value}
      </span>
      <span className="font-mono text-xs text-primary/50 tracking-tighter">
        {unit}
      </span>
    </div>
  </div>
);

const Home = () => {
  const [graph, setGraph] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async (query: string) => {
    setLoading(true);
    try {
      const plan = await getPlan(query);
      const transformed = transformPlan(plan);
      setGraph(transformed);
    } catch (error) {
      console.error("Query failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen p-8 flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl tracking-tighter text-white">
          SQL<span className="text-primary">Query</span>
          <span className="text-white">Visualizer</span>
        </h1>
        <div className="w-20 h-10 rounded-full bg-surface-high border border-surface-bright" />
      </header>

      {/* 2. PERFORMANCE HUD */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Execution Time" value="124" unit="ms" />
        <StatCard label="Rows Affected" value="1.2k" unit="" />
        <StatCard label="Memory Usage" value="42.8" unit="MB" />
        <StatCard label="IO Latency" value="0.08" unit="μs" />
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT: Editor & Visualizer */}
        <div className="col-span-8 flex flex-col gap-8">
          <SqlEditor onRun={handleRun} isLoading={loading} />

          <div className="bg-surface-low rounded-xl p-8 border border-surface-bright/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display uppercase text-[17px] tracking-[0.4em] text-white/40">
                Execution Visualizer
              </h3>
              <span className="font-mono text-[14px] text-primary">
                NODES: {graph ? graph.nodes.length : "0"}
              </span>
            </div>

            {/* Graph Container */}
            <div className="bg-surface-lowest/50 rounded-lg h-[500px] w-full relative border border-surface-bright/10 overflow-hidden">
              {graph ? (
                <PlanGraph {...graph} />
              ) : (
                <p className="font-mono text-xs opacity-20">
                  AWAITING QUERY...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Data Sources */}
          {/* <div className="{bg-surface-low rounded-xl p-6 border border-surface-bright/5"> */}{" "}
          <section className="bg-surface-low p-5 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display uppercase text-[10px] tracking-[0.3em] text-white/40">
                Data Sources
              </h3>
              <span className="text-primary">
                <CirclePlus strokeWidth="2"></CirclePlus>
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-surface-lowest p-4 rounded-md border-l-2 border-primary">
                <p className="text-white font-display text-sm">
                  Upload the Data
                </p>
              </div>
              <div className="bg-surface-lowest/40 p-4 rounded-md opacity-30">
                <p className="text-white font-display text-sm">
                  Analytics_Warehouse
                </p>
                <p className="text-[10px] font-mono opacity-40">
                  dw-stage.internal
                </p>
              </div>
            </div>
          </section>
          {/* Schema Health */}
          <section className="bg-surface-low p-5 rounded-x1">
            <h3 className="font-display uppercase text-[10px] tracking-[0.3em] text-white/40 mb-8">
              Schema Health
            </h3>
            <div className="relative">
              <div className="text-6xl font-display font-bold text-primary">
                99.4%
              </div>
              <div className="font-display uppercase text-[9px] tracking-[0.5em] mt-4 opacity-30">
                Integrity Score
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
