import React from "react";
import type { NodeType, UINode } from "../types";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

interface EditorPanelProps {
  node: UINode
  indent: number
  onAddChildNode: () => void
  onRemoveNode: () => void
  onConfigEdit: () => void
  onNodeTypeChange: (newNodeType: NodeType, nodeId: string) => void
}

interface EditorProps {
  node: UINode
  handleAddChild: (parentId: string) => void
  handleRemove: (nodeId: string) => void
  handleConfigEdit: (nodeId: string) => void
  handleNodeTypeEdit: (newNodeType: NodeType, nodeId: string) => void
}

interface BuilderProps {
  node: UINode
  handleAddChild: (parentId: string) => void
  handleRemove: (nodeId: string) => void
  handleConfigEdit: (nodeId: string) => void
  handleNodeTypeEdit: (newNodeType: NodeType, nodeId: string) => void
}

interface ParsenodeProps {
  node: UINode;
  indent: number
  handleAddChild: (parentId: string) => void
  handleRemove: (nodeId: string) => void
  handleConfigEdit: (nodeId: string) => void
  handleNodeTypeEdit: (newNodeType: NodeType, nodeId: string) => void
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  node,
  indent,
  onAddChildNode,
  onRemoveNode,
  onConfigEdit,
  onNodeTypeChange
}) => {
  const mapNodeType: { [K in NodeType]: string } = {
    "G.UIT.ROOT": "Root Node",
    "G.UIT.R": "Row Node",
    "G.UIT.B": "Box Node",
    "G.UIT.C": "Column Node",
    "G.UIT.T": "Text Node",
  }
  return (
    <div className={`ml-${indent} rounded-lg bg-black-dark min-h-20 grid grid-cols-9 mb-3`}>
      {/* <div className="cursor-pointer m-3 min-w-13 min-h-13 bg-balatro-red border-balatro-redshadow border-2 rounded-lg col-start-1 col-end-3 text-center">{mapNodeType[node.n]}</div> */}
      <select className="text-white cursor-pointer m-3 min-w-13 min-h-13 bg-balatro-red border-balatro-redshadow border-2 rounded-lg col-start-1 col-end-4 text-center"
        onChange={(e) => {
          onNodeTypeChange(e.target.value as NodeType, node.id)
        }}
        value={node.n}>
        <option hidden={true} value="" />
        {Object.entries(mapNodeType).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div onClick={onConfigEdit} className="cursor-pointer m-3 mx-10 bg-mint-dark border-mint-darker border-2 rounded-lg col-start-4 col-end-7 flex justify-center items-center text-2xl"> Config</div>
      <div className="col-start-7 col-end-9 flex">
        <div onClick={onAddChildNode} className="cursor-pointer m-3 bg-balatro-red border-balatro-redshadow border-2 rounded-lg text-white flex justify-center"><PlusIcon /></div>
        <div onClick={onRemoveNode} className="cursor-pointer m-3 bg-balatro-red border-balatro-redshadow border-2 rounded-lg text-white flex justify-center"><MinusIcon /></div>
      </div>
    </div>
  )
}

const Parsenode: React.FC<ParsenodeProps> = ({
  node,
  indent,
  handleAddChild,
  handleRemove,
  handleConfigEdit,
  handleNodeTypeEdit,
}) => {
  return (
    <>
      <div className="pl-4" key={node.id}>
        <EditorPanel
          node={node}
          indent={indent}
          onAddChildNode={() => handleAddChild(node.id)}
          onRemoveNode={() => handleRemove(node.id)}
          onConfigEdit={() => handleConfigEdit(node.id)}
          onNodeTypeChange={handleNodeTypeEdit}
        />
        {node.nodes ? node.nodes.map((child_node) => <Parsenode
          node={child_node}
          indent={indent + 5}
          handleAddChild={handleAddChild}
          handleRemove={handleRemove}
          handleConfigEdit={handleConfigEdit}
          handleNodeTypeEdit={handleNodeTypeEdit}
        />) : ''}
      </div>
    </>
  )
}
const Editor: React.FC<EditorProps> = ({
  node,
  handleAddChild,
  handleRemove,
  handleConfigEdit,
  handleNodeTypeEdit,
}) => {
  return (
    <div className="border-black-light border-2 rounded-lg m-8 p-3 pt-6">
      <Parsenode
        node={node}
        indent={0}
        handleAddChild={handleAddChild}
        handleRemove={handleRemove}
        handleConfigEdit={handleConfigEdit}
        handleNodeTypeEdit={handleNodeTypeEdit}
      />
    </div>
  )
}

const Builder: React.FC<BuilderProps> = ({
  node,
  handleAddChild,
  handleRemove,
  handleConfigEdit,
  handleNodeTypeEdit,
}) => {
  return (
    <div className="w-1/3 h-screen">
      <Editor
        node={node}
        handleAddChild={handleAddChild}
        handleRemove={handleRemove}
        handleConfigEdit={handleConfigEdit}
        handleNodeTypeEdit={handleNodeTypeEdit}
      />
    </div>
  )
}

export default Builder