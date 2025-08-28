import { BrowserRouter as Router } from "react-router";
import Builder from "./components/Builder";
import Sidebar from "./components/Sidebar";
import { exportUIAsJSON, importUIFromJSON } from "./components/JSONImportExport";
import { useState } from "react";
import type { NodeType, UIF_Config, UINode } from "./types";
// import Visualizer from "./components/Visualizer";
import Preview from "./components/Preview";
import EditConfig from "./components/EditConfig";
import {
  exportUIAsLua,
  // importUIFromLua,
} from "./components/LuaImportExport";

function addChildNode(node: UINode, parentId: string, newNode: UINode): UINode {
  if (node.id === parentId) {
    return {
      ...node,
      nodes: [...(node.nodes ?? []), newNode],
    };
  }

  return {
    ...node,
    nodes: node.nodes?.map((child) => addChildNode(child, parentId, newNode)),
  };
}

function removeNode(node: UINode, nodeId: string): UINode | null {
  if (node.id === nodeId) {
    return null; // remove this node
  }

  return {
    ...node,
    nodes: node.nodes
      ?.map((child) => removeNode(child, nodeId))
      .filter((n): n is UINode => n !== null),
  };
}

function editNode(node: UINode, nodeId: string, data: Partial<{ [K in keyof UINode]: UINode[K] }>): UINode {
  if (node.id === nodeId) {
    return {
      ...node,
      ...data
    }
  }

  return {
    ...node,
    nodes: node.nodes
      ?.map((child) => editNode(child, nodeId, data))
  };
}

function getNodeById(node: UINode, nodeId: string): UINode | undefined {
  if (node.id === nodeId) return node;

  for (const child of node.nodes ?? []) {
    const found = getNodeById(child, nodeId);
    if (found !== undefined) return found;
  }

  return undefined;
}

function AppContent() {
  const [rootNode, setRootNode] = useState<UINode>({ id: crypto.randomUUID(), n: "G.UIT.ROOT", config: {}, nodes: [] })
  const [editingConfig, setEditingConfig] = useState<UINode | undefined>()
  const handleOnSave = () => {
    exportUIAsJSON(rootNode)
  }

  const handleOnExport = () => {
    exportUIAsLua(rootNode)
  }

  const handleOnImportJSON = async () => {
    const ret = await importUIFromJSON()
    if (ret) {
      setRootNode(ret)
    }
  }
  // const handleOnImportLua = async () => {
  //   const ret = await importUIFromLua()
  //   if (ret) {
  //     setRootNode(ret)
  //   }
  // }

  const handleAddChild = (parentId: string) => {
    const newNode: UINode = { id: crypto.randomUUID(), n: "G.UIT.R", config: {}, nodes: [] };
    setRootNode((prev) => addChildNode(prev, parentId, newNode));
  };

  const handleRemove = (nodeId: string) => {
    setRootNode((prev) => {
      if (nodeId === rootNode.id) { // when clicking remove on the root node we clear the child nodes 
        return {
          id: rootNode.id,
          n: rootNode.n,
          config: rootNode.config,
          nodes: []
        }
      }
      const newTree = removeNode(prev, nodeId);
      return newTree ?? prev;
    });
  };

  const handleConfigEdit = (nodeId: string) => {
    const oldNode = getNodeById(rootNode, nodeId)
    if (oldNode && oldNode.config) {
      setEditingConfig(oldNode)
    }
  };
  const handleSaveConfig = (newConfig: UIF_Config) => {
    if (!editingConfig) return;

    setRootNode(editNode(rootNode, editingConfig.id, { config: newConfig }))
  }

  const handleNodeTypeEdit = (newNodeType: NodeType, nodeId: string) => {
    setRootNode(editNode(rootNode, nodeId, { n: newNodeType }))
  }

  return (
    <div className="flex flex-row">
      <Sidebar
        handleOnExport={handleOnExport}
        handleOnSave={handleOnSave}
        handleOnImportJSON={handleOnImportJSON}
      // handleOnImportLua={handleOnImportLua}
      />
      <Builder
        node={rootNode}
        handleAddChild={handleAddChild}
        handleRemove={handleRemove}
        handleConfigEdit={handleConfigEdit}
        handleNodeTypeEdit={handleNodeTypeEdit}
      />
      {editingConfig && (
        <EditConfig
          isOpen={!!editingConfig}
          node={editingConfig}
          onClose={() => setEditingConfig(undefined)}
          onSave={handleSaveConfig}
        />
      )}
      {/* <Visualizer node={node} /> // scrap for now */}
      <Preview node={rootNode} /> {/* replacement for Visualizer */}
    </div>
  )
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
