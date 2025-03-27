import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sprout, Cloud, Wheat, ThermometerSun } from "lucide-react";

const Yield_form = () => {
  const [formData, setFormData] = useState({
    crop: "",
    crop_year: "",
    season: "",
    state: "",
    area: "",
    production: "",
    annual_rainfall: "",
    fertilizer: "",
    pesticide: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(submitted);
  const [yield_, setYield] = useState(0);
  const [language, setLanguage] = useState("english");

  const translations = {
    english: {
      title: "Yield Form",
      description: "Record your harvest data for better agricultural insights",
      crop: "Crop",
      cropPlaceholder: "Enter crop name",
      cropYear: "Crop Year",
      cropYearPlaceholder: "YYYY",
      season: "Season",
      seasonPlaceholder: "Enter season",
      state: "State",
      statePlaceholder: "Enter state",
      area: "Area (hectares)",
      areaPlaceholder: "Enter area",
      production: "Production (tons)",
      productionPlaceholder: "Enter production",
      annualRainfall: "Annual Rainfall (mm)",
      annualRainfallPlaceholder: "Enter annual rainfall",
      fertilizer: "Fertilizer (kg/ha)",
      fertilizerPlaceholder: "Enter amount",
      pesticide: "Pesticide (kg/ha)",
      pesticidePlaceholder: "Enter amount",
      submit: "Submit Yield Data",
      submitting: "Planting Data...",
      successTitle: "Data Harvested Successfully!",
      successMessage: "Predicted yield : ",
    },
    hindi: {
      title: "उपज फॉर्म",
      description: "बेहतर कृषि अंतर्दृष्टि के लिए अपनी फसल डेटा दर्ज करें",
      crop: "फसल",
      cropPlaceholder: "फसल का नाम दर्ज करें",
      cropYear: "फसल वर्ष",
      cropYearPlaceholder: "YYYY",
      season: "मौसम",
      seasonPlaceholder: "मौसम दर्ज करें",
      state: "राज्य",
      statePlaceholder: "राज्य दर्ज करें",
      area: "क्षेत्र (हेक्टेयर)",
      areaPlaceholder: "क्षेत्र दर्ज करें",
      production: "उत्पादन (टन)",
      productionPlaceholder: "उत्पादन दर्ज करें",
      annualRainfall: "वार्षिक वर्षा (मिमी)",
      annualRainfallPlaceholder: "वार्षिक वर्षा दर्ज करें",
      fertilizer: "उर्वरक (किग्रा/हेक्टेयर)",
      fertilizerPlaceholder: "मात्रा दर्ज करें",
      pesticide: "कीटनाशक (किग्रा/हेक्टेयर)",
      pesticidePlaceholder: "मात्रा दर्ज करें",
      submit: "उपज डेटा जमा करें",
      submitting: "डेटा लगा रहा है...",
      successTitle: "डेटा सफलतापूर्वक एकत्रित किया गया!",
      successMessage: "अनुमानित उपज : ",
    },
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowMessage(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          crop: "",
          crop_year: "",
          season: "",
          state: "",
          area: "",
          production: "",
          annual_rainfall: "",
          fertilizer: "",
          pesticide: "",
        });
      }, 3000);
    }, 1500);
    let response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        crop: formData.crop,
        crop_year: formData.crop_year,
        season: formData.season,
        state: formData.state,
        area: formData.area,
        production: formData.production,
        annual_rainfall: formData.annual_rainfall,
        fertilizer: formData.fertilizer,
        pesticide: formData.pesticide,
      }),
    });
    let json_ = await response.json();
    setYield(json_["Predicted Yield"]);
  };

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
                {translations[language].successMessage} {yield_}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Wheat className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{translations[language].title}</h2>
            </div>
            <button
              onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-300"
            >
              {language === "english" ? "हिंदी" : "English"}
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
            {translations[language].description}
          </p>
        </motion.div>

        {/* Form fields */}
        <motion.form className="space-y-5" variants={container} initial="hidden" animate="show" onSubmit={handleSubmit}>
          <motion.div variants={item}>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              {translations[language].crop}
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 pl-10 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].cropPlaceholder}
                name="crop"
                value={formData.crop}
                onChange={handleOnchange}
                required
              />
              <Wheat className="absolute left-3 top-3.5 h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].cropYear}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].cropYearPlaceholder}
                name="crop_year"
                value={formData.crop_year}
                onChange={handleOnchange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].season}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].seasonPlaceholder}
                name="season"
                value={formData.season}
                onChange={handleOnchange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              {translations[language].state}
            </label>
            <input
              type="text"
              className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
              placeholder={translations[language].statePlaceholder}
              name="state"
              value={formData.state}
              onChange={handleOnchange}
              required
            />
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].area}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].areaPlaceholder}
                name="area"
                value={formData.area}
                onChange={handleOnchange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].production}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].productionPlaceholder}
                name="production"
                value={formData.production}
                onChange={handleOnchange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              {translations[language].annualRainfall}
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full p-3 pl-10 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].annualRainfallPlaceholder}
                name="annual_rainfall"
                value={formData.annual_rainfall}
                onChange={handleOnchange}
                required
              />
              <Cloud className="absolute left-3 top-3.5 h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].fertilizer}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].fertilizerPlaceholder}
                name="fertilizer"
                value={formData.fertilizer}
                onChange={handleOnchange}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {translations[language].pesticide}
              </label>
              <input
                type="number"
                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                placeholder={translations[language].pesticidePlaceholder}
                name="pesticide"
                value={formData.pesticide}
                onChange={handleOnchange}
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
              {isSubmitting ? translations[language].submitting : translations[language].submit}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Yield_form;