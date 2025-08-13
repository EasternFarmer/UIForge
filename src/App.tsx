import UIF from "./ui_components";

function AppContent() {
  return (
    <>
      <UIF.Root config={{r: 0.1, minw: 8, minh: 6, align: "tm", padding: 0.2, colour: "G.C.BLACK"}}>
        <UIF.Column config={{minw: 4, minh: 4, colour: "G.C.MONEY", padding: 0.15}}>
          <UIF.Row config={{minw:2, minh:2, colour: "G.C.RED", padding: 0.15}}>
            <UIF.Column config={{minw:1, minh:1, colour: "G.C.BLUE", padding: 0.15}}></UIF.Column>
            <UIF.Column config={{minw:1, minh:1, colour: "G.C.BLUE", padding: 0.15}}></UIF.Column>
          </UIF.Row>
          <UIF.Row config={{minw:2, minh:2, colour: "G.C.RED", padding: 0.15}}>
            <UIF.Column config={{minw:1, minh:1, colour: "G.C.BLUE", padding: 0.15}}></UIF.Column>
            <UIF.Column config={{minw:1, minh:1, colour: "G.C.BLUE", padding: 0.15}}></UIF.Column>
          </UIF.Row>
        </UIF.Column>
      </UIF.Root>
    </>
  )
}


function App() {
  return (
    <pre>
      <AppContent />
    </pre>
  )
}

export default App
