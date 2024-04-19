import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import 'src/assets/styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <Routes>
            <Route path="/bim-software-issue-management/" element={<App />} />
        </Routes>
    </Router>
);
