import type React from "react";
import type { UINode } from "../types";

interface PreviewProps {
  node: UINode
}

const Preview: React.FC<PreviewProps> = ({ node }) => {
  return (
    <div className="flex h-screen flex-1/2 text-white">
      <pre>{JSON.stringify(node, null, 2)}</pre>
    </div>
  )
}

export default Preview