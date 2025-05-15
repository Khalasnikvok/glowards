import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from './pages/ContactPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SurveysPage from './pages/SurveysPage';
import SocialsPage from './pages/SocialsPage';
import PromocodePage from './pages/PromocodePage';
import WithdrawalPage from './pages/WithdrawalPage';
import Navbar from "./components/Navbar.jsx";
import { IdProvider } from './contexts/IdContext'; 
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
    return (
        <IdProvider>  
            <BrowserRouter>
                <Navbar/>            
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/contact-us" element={<ContactPage/>} />
                    <Route path="/sign-in" element={<SignInPage/>} />
                    <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} />} />
                    <Route path="/dashboard/surveys" element={<ProtectedRoute element={SurveysPage} />} />
                    <Route path="/dashboard/surveys/socials" element={<ProtectedRoute element={SocialsPage} />} />
                    <Route path="/dashboard/surveys/promocodes" element={<ProtectedRoute element={PromocodePage} />} />
                    <Route path="/dashboard/withdraw" element={<ProtectedRoute element={WithdrawalPage} />} />
                </Routes>
            </BrowserRouter>
        </IdProvider>
    )
}

export default App;
