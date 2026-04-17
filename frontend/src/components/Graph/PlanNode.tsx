import { Handle, Position } from "reactflow";

const getTypeColor = (type: string) => {
  const t = type?.toLowerCase() || '';
  if (t.includes('join')) return { border: 'border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-400' };
  if (t.includes('scan')) return { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-400' };
  if (t.includes('filter')) return { border: 'border-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-400' };
  if (t.includes('select')) return { border: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400' };
  return { border: 'border-surface-bright/20', bg: 'bg-surface-low', text: 'text-white/60' };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlanNode = ({ data }: any) => {
  const colors = getTypeColor(data.label || data.type);
  
  return (
    <div className={`px-4 py-3 rounded-xl border ${colors.border} ${colors.bg} min-w-[200px] flex flex-col gap-3 backdrop-blur-md shadow-lg`}>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-background !border-2 !border-primary" />
      
      <div className={`font-display font-bold text-sm tracking-wide ${colors.text} uppercase text-center`}>
        {data.label || 'Node'}
      </div>
      
      <div className="flex justify-between items-center bg-background/50 px-3 py-2 rounded-md text-[11px] font-mono border border-white/5">
        <span className="text-white/40">ROWS: <strong className="text-white/80">{data.rows !== undefined ? data.rows : '-'}</strong></span>
        <span className="text-white/40">COST: <strong className="text-white/80">{data.cost !== undefined ? data.cost : '-'}</strong></span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-background !border-2 !border-primary" />
    </div>
  );
};

export default PlanNode;
