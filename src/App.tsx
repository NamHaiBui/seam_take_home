import { Route, Routes } from "react-router-dom"
import Home from "./_root/pages/Home"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </main>
  )
}

export default App