import ReactDOM from 'react-dom/client'
import 'src/assets/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/chat' element={<App />} />
        </Routes>
    </BrowserRouter>
)
