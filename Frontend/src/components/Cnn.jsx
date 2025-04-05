import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sprout, Cloud, Wheat, ThermometerSun } from "lucide-react";
import BackgroundWrapper from "./BackgroundWrapper";

function Cnn() {
  const [medicinData, setmedicinData] = useState([]);
  const [language, setLanguage] = useState("hindi");
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(submitted);
  const [prediction, setPrediction] = useState(null); // Store predictedClass

  const translations = {
    english: {
      uploadPhoto: "Upload a Photo",
      uploadButton: "Upload",
      submitting: "Analyzing Image...",
      successTitle: "Prediction Successful!",
      successMessage: "Predicted Class: ",
    },
    hindi: {
      uploadPhoto: "फोटो अपलोड करें",
      uploadButton: "अपलोड करें",
      submitting: "छवि विश्लेषण हो रहा है...",
      successTitle: "भविष्यवाणी सफल!",
      successMessage: "अनुमानित वर्ग: ",
    },
  };

  const getfromcnn = () => {
    return "raj";
  };

  const cnn = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput.files.length) {
      console.error("No file selected");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsSubmitting(true);
    setShowMessage(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/cn", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      setPrediction(result.predictedClass); // Store the predicted class
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowMessage(false);
        fileInputRef.current.value = ""; // Clear the file input
        setPrediction(null); // Reset prediction
      }, 3000);
    }, 1500);
  };

  const getmeddata = async () => {
    console.log("Fetching medicine data...");
    let resp = await fetch("http://127.0.0.1:5000/getmedjson");
    let resp_ = await resp.json();
    console.log(resp_);
    setmedicinData(resp_);
  };

  useEffect(() => {
    getmeddata();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    // <BackgroundWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 dark:from-green-950 dark:via-emerald-900 dark:to-teal-950 p-6 relative overflow-hidden transition-colors duration-500">
        {/* Background animations */}
        <motion.div
          className="absolute top-10 left-10 text-green-600/20 dark:text-green-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Wheat size={120} />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-blue-500/20 dark:text-blue-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Cloud size={100} />
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-1/4 text-emerald-500/10 dark:text-emerald-400/10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sprout size={80} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 text-yellow-500/10 dark:text-yellow-400/10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ThermometerSun size={80} />
        </motion.div>

        {/* Main form card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-green-200 dark:border-green-900 shadow-[0_10px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_50px_rgba(0,255,0,0.1)] rounded-2xl p-8 relative overflow-hidden"
        >
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-green-600/95 dark:bg-green-700/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl p-6"
              >
                <button
                  onClick={() => setShowMessage(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 w-10 h-10 z-50"
                >
                  <X className="h-8 w-8" />
                </button>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="bg-white dark:bg-slate-800 rounded-full p-4 mb-4"
                >
                  <Sprout className="h-10 w-10 text-green-600 dark:text-green-400" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-2xl font-bold mb-2"
                >
                  {translations[language].successTitle}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/90 text-center"
                >
                  {translations[language].successMessage} {prediction}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sprout className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{translations[language].uploadPhoto}</h2>
              </div>
              <button
                onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-300"
              >
                {language === "english" ? "हिंदी" : "English"}
              </button>
            </div>
          </motion.div>

          <motion.form className="space-y-5" variants={container} initial="hidden" animate="show" onSubmit={cnn}>
            <motion.div variants={item}>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].uploadPhoto}
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                  ref={fileInputRef}
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 dark:bg-green-500 group text-white p-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                )}
                {isSubmitting ? translations[language].submitting : translations[language].uploadButton}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    // </BackgroundWrapper>
  );
}

export default Cnn;