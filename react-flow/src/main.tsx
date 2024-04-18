import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './assets/styles.css'
import { ReactFlowProvider } from 'reactflow'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactFlowProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/react-flow/' element={<App />} />
            </Routes>
        </BrowserRouter>
    </ReactFlowProvider>
)
