import type React from "react";
import type { UINode } from "../types";
import { renderUI } from "./visual";

interface VisualizerProps {
  node: UINode
}

const Visualizer: React.FC<VisualizerProps> = ({ node }) => {
  return (
    <div className="flex h-screen bg-orange-200 flex-1/2">
      {renderUI(node)}
    </div>
  )
}

export default Visualizer