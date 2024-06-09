import { BrowserRouter as Router } from "react-router-dom";
import CustomRoutes from './routes/CustomRoutes'
import './App.css'

function App() {

  return (
    <Router>
      <CustomRoutes />
    </Router>
  )
}

export default App