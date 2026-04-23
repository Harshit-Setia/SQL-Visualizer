import { StatCard } from "./StatCard";

export const PerformanceHud = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Execution Time" value="124" unit="ms" isWip={true} />
      <StatCard label="Rows Affected" value="1.2k" unit="" isWip={true} />
      <StatCard label="Memory Usage" value="42.8" unit="MB" isWip={true} />
      <StatCard label="IO Latency" value="0.08" unit="μs" isWip={true}/>
    </div>
  );
};
