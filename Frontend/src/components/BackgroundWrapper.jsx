// BackgroundWrapper.js
import { motion } from "framer-motion"
import { Wheat, Cloud, Sprout, ThermometerSun } from "lucide-react"

const BackgroundWrapper = ({ children }) => {
    return (
        <div className="min-h-screen flex  bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 dark:from-green-950 dark:via-emerald-900 dark:to-teal-950 p-6 relative overflow-hidden transition-colors duration-500">
            {/* Rotating Wheat */}
            <motion.div className="absolute top-10 left-10 text-green-600/20 dark:text-green-400/20"
                animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                <Wheat size={120} />
            </motion.div>

            {/* Rotating Cloud */}
            <motion.div className="absolute bottom-10 right-10 text-blue-500/20 dark:text-blue-400/20"
                animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                <Cloud size={100} />
            </motion.div>

            {/* Floating Sprout */}
            <motion.div className="absolute top-1/4 right-1/4 text-emerald-500/10 dark:text-emerald-400/10"
                animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <Sprout size={80} />
            </motion.div>

            {/* Scaling ThermometerSun */}
            <motion.div className="absolute bottom-1/4 left-1/4 text-yellow-500/10 dark:text-yellow-400/10"
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                <ThermometerSun size={80} />
            </motion.div>

            {children}
        </div>
    )
}

export default BackgroundWrapper
