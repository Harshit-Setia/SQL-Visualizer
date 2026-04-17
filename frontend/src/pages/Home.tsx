import { useState } from "react";
import { SqlEditor } from "../components/Editor/SqlEditor";
import PlanGraph from "../components/Graph/PlanGraph";
import { getPlan } from "../services/api";
import { transformPlan } from "../utils/transform";
//importing lucid react icon
import { CirclePlus } from "lucide-react";

// Internal Sub-components to keep the main component clean
const StatCard = ({ label, value, unit, isWip }: { label: string; value: string; unit: string; isWip?: boolean }) => (
  <div className="relative bg-surface-low p-6 rounded-lg border border-surface-bright/5">
    
    {/* The actual Card Content */}
    <p className="font-display text-[9px] uppercase tracking-[0.4em] text-white/30 mb-2">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-4xl font-bold text-primary">{value}</span>
      <span className="font-mono text-xs text-primary/50 tracking-tighter">{unit}</span>
    </div>

    {/* THE WORK IN PROGRESS OVERLAY */}
    {isWip && (
      <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[4px] flex flex-col items-center justify-center rounded-lg border border-primary/20 cursor-not-allowed group">
        {/* Caution Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(-45deg,#FF8C00,#FF8C00_10px,transparent_10px,transparent_20px)]" />
        
        {/* WIP Text/Image */}
        <div className="relative z-30 flex flex-col items-center gap-2">
           <span className="text-primary text-xl animate-pulse">⚡</span>
           <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Work in Progress</span>
        </div>
      </div>
    )}
  </div>
);


const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      {/* 1. APP HEADER */}
      <header className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl tracking-tighter text-white">
          SQL<span className="text-primary">Query</span>
          <span className="text-white">Visualizer</span>
        </h1>
        <div className="w-20 h-10 rounded-full bg-surface-high border border-surface-bright" />
      </header>

      {/* 2. PERFORMANCE HUD */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Execution Time" value="124" unit="ms" isWip={true} />
        <StatCard label="Rows Affected" value="1.2k" unit="" isWip={true} />
        <StatCard label="Memory Usage" value="42.8" unit="MB" isWip={true} />
        <StatCard label="IO Latency" value="0.08" unit="μs" isWip={true}/>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT: Editor & Visualizer */}
        <div className="col-span-8 flex flex-col gap-8">
          <SqlEditor onRun={handleRun} isLoading={loading} />

          <div className="bg-surface-low rounded-xl p-8 border border-surface-bright/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display uppercase text-[20px] tracking-[0.4em] text-white/40">
                Execution Visualizer
              </h3>
              <span className="font-mono text-[15px] text-primary">
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
         
          {/* <div className="{bg-surface-low rounded-xl p-6 border border-surface-bright/5"> */}
          
          <div className="blur"> // Remove this to get the actual content after the feature is working
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display uppercase text-[10px] tracking-[0.3em] text-white/40">
                Data Sources
              </h3>
              <span className="text-primary"><CirclePlus strokeWidth='2'></CirclePlus></span>
            </div>
            <div className="space-y-3">
              <div className="bg-surface-lowest p-4 rounded-md border-l-2 border-primary">
                <p className="text-white font-display text-sm">
                  Main_Prod_Cluster
                </p>
                <p className="text-[10px] font-mono opacity-40">
                  us-east-1.aws.cloud
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
          </div>

          {/* Schema Health */}
          
          {/* <div className="bg-surface-low rounded-xl p-10 text-center border border-surface-bright/5"> */}
          
          <div className="blur"> // Remove this to get the actual content after the feature is working
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
