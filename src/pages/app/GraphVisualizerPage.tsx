import React from 'react';
import { Layers } from 'lucide-react';
import { ForceGraphCanvas } from '../../components/forensics/ForceGraphCanvas';

export const GraphVisualizerPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[#0F2747]">Interactive Graph Visualizer</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Node-link topological flow visualization highlighting fund velocity, peeling hops, anonymity mixers, and VASP exit ramps.
        </p>
      </div>

      <ForceGraphCanvas />
    </div>
  );
};
