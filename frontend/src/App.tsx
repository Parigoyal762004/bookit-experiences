import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import { useToast } from './hooks/useToast';

const App: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/experience/:id" element={<Details />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/result" element={<Result />} />
                    </Routes>
                </main>
                <Footer />
                <Toast toasts={toasts} onRemove={removeToast} />
            </div>
        </BrowserRouter>
    );
};

export default App;