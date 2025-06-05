import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to building amazing landing pages.
        </p>
        
        <Link
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
          Back to PageForge
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound