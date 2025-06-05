import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from './components/pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
        toastClassName="rounded-xl"
      />
    </div>
  )
}

export default App