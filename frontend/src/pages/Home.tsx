import { useState, useRef } from "react";
import { SqlEditor } from "../components/Editor/SqlEditor";
import PlanGraph from "../components/Graph/PlanGraph";
import { getPlan } from "../services/api";
import { transformPlan } from "../utils/transform";
import { Maximize, Minimize } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { PerformanceHud } from "../components/PerformanceHud";
import { RightSidebar } from "../components/RightSidebar";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [graph, setGraph] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleRun = async (query: string) => {
    setLoading(true);
    setErrorDetails(null);
    try {
      const plan = await getPlan(query);
      const transformed = transformPlan(plan);
      setGraph(transformed);
      
      // Auto-scroll to graph with slight delay to ensure it renders first
      setTimeout(() => {
        graphRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      console.error("Query failed", error);
      setErrorDetails(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-350 mx-auto min-h-screen p-8 flex flex-col gap-10">
      {/* 1. APP HEADER */}
      <Navbar />

      {/* 2. PERFORMANCE HUD */}
      <PerformanceHud />

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT: Editor & Visualizer */}
        <div className="col-span-8 flex flex-col gap-8">
          <SqlEditor onRun={handleRun} isLoading={loading} errorDetails={errorDetails} />

          <div 
            ref={graphRef}
            className={`${isFullScreen ? 'fixed inset-4 z-50 flex flex-col bg-[#0b0c10] shadow-[0_0_100px_rgba(0,0,0,0.8)]' : 'bg-surface-low'} rounded-xl p-8 border border-surface-bright/5 transition-all duration-300`}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display uppercase text-[20px] tracking-[0.4em] text-white/40">
                Execution Visualizer
              </h3>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[15px] text-primary">
                  NODES: {graph ? graph.nodes.length : "0"}
                </span>
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="text-white/40 hover:text-primary transition-colors flex items-center gap-2 bg-surface-lowest/50 px-3 py-1.5 rounded-md border border-surface-bright/10"
                >
                  {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
                  <span className="text-xs uppercase tracking-wider">{isFullScreen ? 'Minimize' : 'Fullscreen'}</span>
                </button>
              </div>
            </div>

            {/* Graph Container */}
            <div className={`bg-surface-lowest/50 rounded-lg ${isFullScreen ? 'flex-1 min-h-0' : 'h-125 w-full'} relative border border-surface-bright/10 overflow-hidden`}>
              {graph ? (
                <PlanGraph {...graph} />
              ) : (
                <p className="font-mono text-xs opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  AWAITING QUERY...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
