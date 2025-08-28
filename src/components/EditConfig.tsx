import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  DocumentTextIcon,
  Cog6ToothIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import type { AlignType, UIF_Config } from "../types";
import InputDropdown from "./generic/InputDropdown";
import Checkbox from "./generic/Checkbox";
import Button from "./generic/Button";
import InputField from "./generic/InputField";

interface EditConfigProps {
  isOpen: boolean;
  config_n_id: { config: UIF_Config, nodeId: string };
  onClose: () => void;
  onSave: (config: UIF_Config) => void;
}

const EditConfig: React.FC<EditConfigProps> = ({
  isOpen,
  config_n_id,
  onClose,
  onSave,
}) => {
  const config = config_n_id.config
  const [activeTab, setActiveTab] = useState<"config" | "advanced config" | "text config">("config")
  const [formData, setFormData] = useState<UIF_Config>(config);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = useCallback(() => {
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...config,
      });
    }
  }, [isOpen, config]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleSave]);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNumberChange = (field: string, value: number) => {
    setFormData({
      ...formData,
      [field]: isNaN(value) ? undefined : value,
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({
      ...formData,
      [field]: checked ? true : undefined,
    });
  };

  const tabs = [
    { id: "config", label: "Config", icon: Cog6ToothIcon },
    { id: "advanced config", label: "Advanced Config", icon: Cog8ToothIcon },
    { id: "text config", label: "Text Config", icon: DocumentTextIcon },
  ];

  const alignOptions = [
    "tl", "tm", "tr",
    "cl", "cm", "cr",
    "bl", "bm", "br"
  ]
  const alignName: { [K in AlignType]: string } = {
    "tl": "Top Left",
    "tm": "Top Middle",
    "tr": "Top right",
    "cl": "Center Left",
    "cm": "Center Middle",
    "cr": "Center Right",
    "bl": "Bottom Left",
    "bm": "Bottom Middle",
    "br": "Bottom Right"
  }

  const colourOptions = [
    "G.C.MULT", "G.C.CHIPS", "G.C.MONEY", "G.C.XMULT", "G.C.FILTER",
    "G.C.BLUE", "G.C.RED", "G.C.GREEN", "G.C.PALE_GREEN", "G.C.ORANGE", "G.C.IMPORTANT",
    "G.C.GOLD", "G.C.YELLOW", "G.C.CLEAR", "G.C.WHITE", "G.C.PURPLE", "G.C.BLACK",
    "G.C.L_BLACK", "G.C.GREY", "G.C.CHANCE", "G.C.JOKER_GREY", "G.C.VOUCHER", "G.C.BOOSTER",
    "G.C.EDITION", "G.C.DARK_EDITION", "G.C.ETERNAL", "G.C.PERISHABLE", "G.C.RENTAL",
    "G.C.UI.TEXT_LIGHT", "G.C.UI.TEXT_DARK", "G.C.UI.TEXT_INACTIVE", "G.C.UI.BACKGROUND_LIGHT",
    "G.C.UI.BACKGROUND_WHITE", "G.C.UI.BACKGROUND_DARK", "G.C.UI.BACKGROUND_INACTIVE",
    "G.C.UI.OUTLINE_LIGHT", "G.C.UI.OUTLINE_LIGHT_TRANS", "G.C.UI.OUTLINE_DARK",
    "G.C.UI.TRANSPARENT_LIGHT", "G.C.UI.TRANSPARENT_DARK", "G.C.UI.HOVER"
  ]

  return (
    <div className="fixed inset-0 flex bg-black-darker/80 backdrop-blur-sm items-center justify-center z-50 font-lexend">
      <div className="flex items-start gap-8 max-h-[90vh]">
        <div
          ref={modalRef}
          className="bg-black-dark border-2 border-black-lighter rounded-lg w-[100vh] h-[90vh] flex flex-col relative overflow-hidden"
        >
          <div className="flex">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as "config" | "advanced config" | "text config")
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-black transition-all relative border-b-2 ${isActive
                    ? "text-mint-lighter bg-black-dark border-mint"
                    : "text-white-darker hover:text-white-light hover:bg-black-dark border-b-2 border-black-lighter"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {index < tabs.length - 1 && !isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-black-lighter"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="h-full overflow-y-auto custom-scrollbar">
              {activeTab === "config" && (
                <div className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white-light font-medium text-base mb-4 flex items-center gap-2">
                        <Cog6ToothIcon className="h-5 w-5 text-mint" />
                        Config
                      </h4>
                      <div className="flex gap-6">

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <InputDropdown
                              value={formData.align || "None"}
                              onChange={(value) =>
                                handleInputChange(
                                  "align",
                                  value
                                )
                              }
                              //@ts-ignore
                              options={[{ value: undefined, label: "None" }, ...alignOptions.map((value) => {
                                return {
                                  value: value,
                                  label: alignName[value as AlignType]
                                }
                              })]}
                              separator={true}
                              label="Align"
                            />
                            <InputDropdown
                              value={formData.colour || "None"}
                              onChange={(value) =>
                                handleInputChange(
                                  "colour",
                                  value
                                )
                              }
                              //@ts-ignore
                              options={[{ value: undefined, label: "None" }, ...colourOptions.map((value) => {
                                return {
                                  value: value,
                                  label: value.replace("G.C.", "")
                                }
                              })]}
                              separator={true}
                              label="Colour"
                            />
                            <InputDropdown
                              value={formData.outline_colour || "None"}
                              onChange={(value) =>
                                handleInputChange(
                                  "outline_colour",
                                  value
                                )
                              }
                              //@ts-ignore
                              options={[{ value: undefined, label: "None" }, ...colourOptions.map((value) => {
                                return {
                                  value: value,
                                  label: value.replace("G.C.", "")
                                }
                              })]}
                              separator={true}
                              label="Outline Colour"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <InputField
                              value={formData.h?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "h",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Height"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.minh?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "minh",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Minimum Height"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.maxh?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "maxh",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Maximum Height"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.w?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "w",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Width"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.minw?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "minw",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Minimum Width"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.maxw?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "maxw",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="undefined"
                              label="Maximum Width"
                              type="number"
                              size="sm"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <InputField
                              value={formData.r?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "r",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="Standard is 0.1"
                              label="Roundness"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.outline?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "outline",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="Standard value is ???"
                              label="Outline Thickness"
                              type="number"
                              size="sm"
                            />
                            <InputField
                              value={formData.emboss?.toString() ?? ""}
                              onChange={(e) =>
                                handleNumberChange(
                                  "emboss",
                                  parseInt(e.target.value)
                                )
                              }
                              placeholder="Standard value is 0.05"
                              label="Emboss (Raised out of parent node)"
                              type="number"
                              size="sm"
                            />
                          </div>
                          <div>
                            <div className="space-y-4 rounded-lg border border-black-lighter p-4 bg-black-darker/30">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                <Checkbox
                                  id="no_fill_edit"
                                  label="No Fill"
                                  checked={formData.no_fill === true}
                                  onChange={(checked) =>
                                    handleCheckboxChange(
                                      "no_fill",
                                      checked
                                    )
                                  }
                                />
                                <Checkbox
                                  id="hover_edit"
                                  label="Hover"
                                  checked={formData.hover === true}
                                  onChange={(checked) =>
                                    handleCheckboxChange(
                                      "hover",
                                      checked
                                    )
                                  }
                                />
                                <Checkbox
                                  id="shadow_edit"
                                  label="Shadow"
                                  checked={formData.shadow === true}
                                  onChange={(checked) =>
                                    handleCheckboxChange(
                                      "shadow",
                                      checked
                                    )
                                  }
                                />
                                <Checkbox
                                  id="juice_edit"
                                  label="Juice"
                                  checked={formData.juice === true}
                                  onChange={(checked) =>
                                    handleCheckboxChange(
                                      "juice",
                                      checked
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "advanced config" && (
                // soon
                <></>
              )}

              {/* in the future we can add shop appearence (in_pool) rules to this tab */}
              {activeTab === "text config" && (
                <></>
              )}
            </div>
          </div>

          <div className="flex gap-4 p-4">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              onTouchEnd={handleSave}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditConfig;