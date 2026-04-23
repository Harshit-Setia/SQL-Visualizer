import { CirclePlus } from "lucide-react";

export const RightSidebar = () => {
  return (
    <div className="col-span-4 flex flex-col gap-6">
      {/* Data Sources */}
      
      {/* <div className="bg-surface-low rounded-xl p-6 border border-surface-bright/5"> */}
      
      <div className="blur"> {/* Remove this to get the actual content after the feature is working */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display uppercase text-[10px] tracking-[0.3em] text-white/40">
            Data Sources
          </h3>
          <span className="text-primary"><CirclePlus strokeWidth='2' /></span>
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
      
      <div className="blur"> {/* Remove this to get the actual content after the feature is working */}
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
  );
};
