export type ColourType = "G.C.MULT" | "G.C.CHIPS" | "G.C.MONEY" | "G.C.XMULT" | "G.C.FILTER" |
  "G.C.BLUE" | "G.C.RED" | "G.C.GREEN" | "G.C.PALE_GREEN" | "G.C.ORANGE" | "G.C.IMPORTANT" |
  "G.C.GOLD" | "G.C.YELLOW" | "G.C.CLEAR" | "G.C.WHITE" | "G.C.PURPLE" | "G.C.BLACK" |
  "G.C.L_BLACK" | "G.C.GREY" | "G.C.CHANCE" | "G.C.JOKER_GREY" | "G.C.VOUCHER" | "G.C.BOOSTER" |
  "G.C.EDITION" | "G.C.DARK_EDITION" | "G.C.ETERNAL" | "G.C.PERISHABLE" | "G.C.RENTAL" |
  "G.C.UI.TEXT_LIGHT" | "G.C.UI.TEXT_DARK" | "G.C.UI.TEXT_INACTIVE" | "G.C.UI.BACKGROUND_LIGHT" |
  "G.C.UI.BACKGROUND_WHITE" | "G.C.UI.BACKGROUND_DARK" | "G.C.UI.BACKGROUND_INACTIVE" |
  "G.C.UI.OUTLINE_LIGHT" | "G.C.UI.OUTLINE_LIGHT_TRANS" | "G.C.UI.OUTLINE_DARK" |
  "G.C.UI.TRANSPARENT_LIGHT" | "G.C.UI.TRANSPARENT_DARK" | "G.C.UI.HOVER" | `HEX("${string}")`

// export interface Tooltip {
//   title: string
//   text: string[]
// }

export type AlignType = "tl" | "tm" | "tr" | "cl" | "cm" | "cr" | "bl" | "bm" | "br";

export interface UIF_Config {
  /** where the child nodes are placed within the current node; */
  align?: AlignType
  /** the fixed Height of this node */
  h?: number
  /** the minimum Height of this node */
  minh?: number
  /** the maximum Height of this node */
  maxh?: number
  /** the fixed Width of this node */
  w?: number
  /** the minimum Width of this node */
  minw?: number
  /** the maximum Width of this node */
  maxw?: number
  /** the extra space inside the edges of the current node. Standard values are 0.05 or 0.1. */
  padding?: number
  /** the Roundness of corners of the current node. Standard value is 0.1. */
  r?: number
  /** the fill colour of the current node. */
  colour?: ColourType
  /** set to true for no fill. */
  no_fill?: boolean
  /** the thickness of the outline of the current node. Standard value is ???. */
  outline?: number
  /** the colour of the outline of the current node. */
  outline_colour?: ColourType
  /** how much the current node is raised out of its parent node. Standard value is 0.05. */
  emboss?: number
  /** set to true to render the current node as hovering above its parent node. */
  hover?: boolean
  /** set to true to render the shadow of the current node; only shows-up under hovering nodes. */
  shadow?: boolean
  /** set to true to apply the juice_up animation to the current node once it loads in. */
  juice?: boolean
  /** set a custom ID to the current node. */
  id?: string
  /** a table containing some data that is relevant to the current node. This is used to pass data to UI nodes or between UI-related functions.*/
  ref_table?: "<insert your table here>"
  /** a string corresponding to a key in the current node's ref_table. This is always used in conjunction with ref_table to access the relevant value by key. */
  ref_value?: string
  /** set a function that will be called when the current node is being drawn. Its value is a string of the function name; the function itself must be stored in G.FUNCS. */
  func?: string
  /** set a function that will be called when the current node is clicked on. Its value is a string of the function name; the function itself must be stored in G.FUNCS. */
  button?: string
  // /** add a tooltip when the current node is hovered over by a mouse/controller. Its value is a table: {title = "", text = {"Line1", "Line2"}}. */
  // tooltip?: Tooltip

  /* 
  TEXT CONFIG
  */

  /** set the string to display. Alternatively, you can set text via the ref_table and ref_value combination;  */
  text?: string
  // /** a table containing some data that is relevant to the current node. This is used to pass data to UI nodes or between UI-related functions.*/
  // ref_table?: "<insert your table here>"
  // /** a string corresponding to a key in the current node's ref_table. This is always used in conjunction with ref_table to access the relevant value by key. */
  // ref_value?: string
  // /** set the text colour. Standard values are G.C.UI.TEXT_LIGHT, G.C.UI.TEXT_DARK, and G.C.UI.TEXT_INACTIVE */
  // colour: ColourType
  /** set a multiplier to text size. */
  scale?: number
  /** set to true to draw the text vertically (ie. sideways). */
  vert?: boolean
}

export type NodeType = "G.UIT.ROOT" | "G.UIT.R" | "G.UIT.C" | "G.UIT.T" | "G.UIT.B"

export interface UINode {
  id: string;
  n: NodeType
  config?: UIF_Config
  nodes?: UINode[]
}