import type React from "react";

interface SidebarProps {
  handleOnExport: () => void
  handleOnSave: () => void
  handleOnImportJSON: () => void
  // handleOnImportLua: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  handleOnExport,
  handleOnSave,
  handleOnImportJSON,
  // handleOnImportLua,
}) => {
  const specialTabs = [
    { label: "Import (JSON)", func: handleOnImportJSON },
    // { label: "Import (Lua)", func: handleOnImportLua },
    { label: "Save (JSON)", func: handleOnSave },
    { label: "Export", func: handleOnExport },
  ]
  return (
    <div className="flex flex-col w-1/6 h-screen p-6 text-black-dark">
      {specialTabs.map((tab) => (
        <div onClick={tab.func} key={tab.label}
          className="cursor-pointer flex min-h-15 bg-mint-dark border-2 border-mint-darker rounded-lg m-2 justify-center items-center">
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default Sidebar