import type { UINode } from "../types";

export const normalizeUINodeData = (node: UINode): UINode => {
  return {
    id: node.id || crypto.randomUUID(),
    n: node.n || "G.UIT.ROOT",
    config: node.config || {},
    nodes: node.nodes ? node.nodes.map(normalizeUINodeData) : []
  }
}

export const UIToJson = (node: UINode): { filename: string; jsonString: string } => {
  const exportData: UINode = normalizeUINodeData(node)

  const jsonString = JSON.stringify(exportData, null, 2);
  const filename = `UIForge-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  return { filename, jsonString };
}
export const exportUIAsJSON = (node: UINode): void => {
  const ret = UIToJson(node);
  const blob = new Blob([ret.jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = ret.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importUIFromJSON = (): Promise<UINode | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonString = e.target?.result as string;
          const importData: UINode = JSON.parse(jsonString);

          const normalizedUINode = normalizeUINodeData(importData)

          console.log(
            `Successfully imported Balatro UI`
          );

          resolve(normalizedUINode);
        } catch (error) {
          console.error("Error parsing UI file:", error);
          reject(
            new Error(
              `Invalid UI file format: ${error instanceof Error
                ? error.message
                : "Please check the file and try again."
              }`
            )
          );
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        reject(new Error("Failed to read the selected file."));
      };

      reader.readAsText(file);
    };

    input.oncancel = () => {
      resolve(null);
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
};