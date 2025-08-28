import type {
  UIF_Config,
} from "../types";

interface UIF_Element {
  children?: React.ReactNode
  config?: UIF_Config
}


const parseConfig = (config: UIF_Config) => {
  const configEntries: string[] = []
  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === "string" && key !== "colour" && key !== "ref_table") {
      value = `"${value}"`
    }
    if (key === "tooltip") {
      configEntries.push(`${key} = {${value.join(", ")}}`)
    } else {
      configEntries.push(`${key} = ${value}`)
    }
  })
  return configEntries.join(', ')
}

const Root: React.FC<UIF_Element> = ({ children, config }) => {
  return (
    <>
      <p>{`{n = G.UIT.ROOT${config ? `, config = {${parseConfig(config)}}` : ``}, nodes = {`}</p>
      {children ? <><br />{children}<br /></> : ""}
      <p>{`}}`}</p><br />
    </>
  )
}

const Row: React.FC<UIF_Element> = ({ children, config }) => {

  return (
    <>
      <p>{`{n = G.UIT.R${config ? `, config = {${parseConfig(config)}}` : ``}, nodes = {`}</p>
      {children ? <><br />{children}<br /></> : ""}
      <p>{`}}`}</p><br />
    </>
  )
}

const Column: React.FC<UIF_Element> = ({ children, config }) => {

  return (
    <>
      <p>{`{n = G.UIT.C${config ? `, config = {${parseConfig(config)}}` : ``}, nodes = {`}</p>
      {children ? <><br />{children}<br /></> : ""}
      <p>{`}}`}</p><br />
    </>
  )
}

/**
 * Needs h and w in it's config, ignores child nodes
 */
const Box: React.FC<UIF_Element> = ({ config }) => {

  return (
    <>
      <p>{`{n = G.UIT.B${config ? `, config = {${parseConfig(config)}}` : ``}, nodes = {}}`}</p>
    </>
  )
}

/**
 * This node must contain text, colour, and scale in its config.
 */
const Text: React.FC<UIF_Element> = ({ config }) => {

  return (
    <>
      <p>{`{n = G.UIT.T${config ? `, config = {${parseConfig(config)}}` : ``}, nodes = {}}`}</p>
    </>
  )
}

const UIF = {
  Root, ROOT: Root,
  Row, R: Row,
  Column, C: Column,
  Box, B: Box,
  Text, T: Text
} as const

export default UIF