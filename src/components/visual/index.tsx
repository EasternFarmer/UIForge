import type { UINode } from "../../types";

export const renderUI = (node: UINode): React.ReactNode => {
  switch (node.n) {
    case "G.UIT.ROOT":
      return <div>{node.nodes?.map((node) => renderUI(node))}</div>
    case "G.UIT.R":
      return <div className="flex">{node.nodes?.map((node) => renderUI(node))}</div>
    case "G.UIT.C":
      return <div>{node.nodes?.map((node) => renderUI(node))}</div>
    case "G.UIT.T":
      return <p>{node.nodes?.map((node) => renderUI(node))}</p>
    case "G.UIT.B":
      return <div>{node.nodes?.map((node) => renderUI(node))}</div>
    default:
      return <>{node.nodes?.map((node) => renderUI(node))}</>
  }
}