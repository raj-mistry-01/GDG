import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sprout, Cloud, Wheat, ThermometerSun } from "lucide-react";

const CropAdviceForm = () => {
    const [accepted, setAccepted] = useState(false);
    const [formData, setFormData] = useState({
        N: "",
        P: "",
        K: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showMessage, setShowMessage] = useState(submitted);
    // const [yield_, setYield] = useState(0);
    const [rec_crops, setrec_crops] = useState([])
    const [language, setLanguage] = useState("hindi");

    const translations = {
        english: {
            title: "Soil Analysis Form",
            description: "Record your soil data for better agricultural insights",
            N: "Nitrogen (kg/ha)",
            NPlaceholder: "Enter nitrogen amount",
            P: "Phosphorus (kg/ha)",
            PPlaceholder: "Enter phosphorus amount",
            K: "Potassium (kg/ha)",
            KPlaceholder: "Enter potassium amount",
            temperature: "Temperature (°C)",
            temperaturePlaceholder: "Enter temperature",
            humidity: "Humidity (%)",
            humidityPlaceholder: "Enter humidity",
            ph: "Soil pH",
            phPlaceholder: "Enter soil pH",
            rainfall: "Rainfall (mm)",
            rainfallPlaceholder: "Enter rainfall",
            submit: "Submit Soil Data",
            submitting: "Recording Data...",
            successTitle: "Data Recorded Successfully!",
            successMessage: "Predicted yield : ",
            instructionsTitle: "Important Instructions for Farmers",
            instructionsText: `Before filling out the form, it is essential to have a Soil Health Card. This card provides detailed information about the nutrient content and health of your soil, which is necessary for accurately completing the required fields in the form.
            
How to Get Your Soil Health Card:
Visit the Official Website: Go to the <a href="https://soilhealth.dac.gov.in/home" target="_blank" rel="noopener noreferrer" class="underline text-blue-500">Soil Health Card Portal</a>.
Select Your State & District: Choose your state and district to proceed.
Enter Required Details: Provide the necessary information, such as your land details and Aadhaar number, if required.
Download the Soil Health Card: Once processed, you will receive your Soil Health Card, which contains vital data about your soil’s nutrient levels.

⚠ Please make sure to obtain your Soil Health Card before proceeding with the form to ensure accurate input of soil data.`,
            agree: "I Agree",
        },
        hindi: {
            title: "मिट्टी विश्लेषण फॉर्म",
            description: "बेहतर कृषि अंतर्दृष्टि के लिए अपनी मिट्टी डेटा दर्ज करें",
            N: "नाइट्रोजन (किग्रा/हेक्टेयर)",
            NPlaceholder: "नाइट्रोजन की मात्रा दर्ज करें",
            P: "फॉस्फोरस (किग्रा/हेक्टेयर)",
            PPlaceholder: "फॉस्फोरस की मात्रा दर्ज करें",
            K: "पोटेशियम (किग्रा/हेक्टेयर)",
            KPlaceholder: "पोटेशियम की मात्रा दर्ज करें",
            temperature: "तापमान (°C)",
            temperaturePlaceholder: "तापमान दर्ज करें",
            humidity: "नमी (%)",
            humidityPlaceholder: "नमी दर्ज करें",
            ph: "मिट्टी का pH",
            phPlaceholder: "मिट्टी का pH दर्ज करें",
            rainfall: "वर्षा (मिमी)",
            rainfallPlaceholder: "वर्षा दर्ज करें",
            submit: "मिट्टी डेटा जमा करें",
            submitting: "डेटा दर्ज किया जा रहा है...",
            successTitle: "डेटा सफलतापूर्वक एकत्रित किया गया!",
            successMessage: "अनुमानित उपज : ",
            instructionsTitle: "किसानों के लिए महत्वपूर्ण निर्देश",
            instructionsText: `फॉर्म भरने से पहले, यह आवश्यक है कि आपके पास एक सोइल हेल्थ कार्ड हो। यह कार्ड आपकी मिट्टी के पोषक तत्व और स्वास्थ्य की विस्तृत जानकारी प्रदान करता है, जो फॉर्म में आवश्यक फील्ड्स को सही ढंग से भरने के लिए आवश्यक है।

सोइल हेल्थ कार्ड कैसे प्राप्त करें:
आधिकारिक वेबसाइट पर जाएँ: Soil Health Card Portal पर जाएँ (<a href="https://soilhealth.dac.gov.in/home" target="_blank" rel="noopener noreferrer" class="underline text-blue-500">यहाँ क्लिक करें</a>)।
अपने राज्य और जिला का चयन करें: आगे बढ़ने के लिए अपने राज्य और जिले का चयन करें।
आवश्यक विवरण दर्ज करें: अपनी भूमि से संबंधित विवरण और यदि आवश्यक हो तो आधार नंबर दर्ज करें।
सोइल हेल्थ कार्ड डाउनलोड करें: प्रक्रिया पूरी होने पर, आपको आपका सोइल हेल्थ कार्ड प्राप्त होगा, जिसमें आपकी मिट्टी के पोषक तत्वों का महत्वपूर्ण डेटा होता है।

⚠ कृपया फॉर्म भरने से पहले अपना सोइल हेल्थ कार्ड प्राप्त करें ताकि मिट्टी डेटा सही तरीके से दर्ज किया जा सके।`,
            agree: "मैं सहमत हूँ",
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
                    N: "",
                    P: "",
                    K: "",
                    temperature: "",
                    humidity: "",
                    ph: "",
                    rainfall: "",
                });
            }, 3000);
        }, 1500);
        let response = await fetch("http://127.0.0.1:5000/cropadvice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                N: formData.N,
                P: formData.P,
                K: formData.K,
                temperature: formData.temperature,
                humidity: formData.humidity,
                ph: formData.ph,
                rainfall: formData.rainfall,
            }),
        });
        let json_ = await response.json();
        setrec_crops(json_["rec_crops"]);
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

    if (!accepted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 dark:from-green-950 dark:via-emerald-900 dark:to-teal-950 p-6">
                <div className="max-w-xl w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-green-200 dark:border-green-900 shadow-lg rounded-2xl p-8 relative">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-300"
                        >
                            {language === "english" ? "हिंदी" : "English"}
                        </button>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                        {translations[language].instructionsTitle}
                    </h2>
                    <div
                        className="text-slate-600 dark:text-slate-400 whitespace-pre-line mb-6"
                        dangerouslySetInnerHTML={{ __html: translations[language].instructionsText }}
                    />
                    <button
                        onClick={() => setAccepted(true)}
                        className="w-full bg-green-600 dark:bg-green-500 text-white p-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:bg-green-700 dark:hover:bg-green-600"
                    >
                        {translations[language].agree}
                    </button>
                </div>
            </div>
        );
    }

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
                                {translations[language].successMessage} {rec_crops.join(", ")}
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
                    <motion.div variants={item} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].N}
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].NPlaceholder}
                                name="N"
                                value={formData.N}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].P}
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].PPlaceholder}
                                name="P"
                                value={formData.P}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].K}
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].KPlaceholder}
                                name="K"
                                value={formData.K}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].temperature}
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].temperaturePlaceholder}
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].humidity}
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].humidityPlaceholder}
                                name="humidity"
                                value={formData.humidity}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                                {translations[language].ph}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                className="w-full p-3 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].phPlaceholder}
                                name="ph"
                                value={formData.ph}
                                onChange={handleOnchange}
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={item}>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                            {translations[language].rainfall}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full p-3 pl-10 border border-green-200 dark:border-green-800 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 outline-none transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-800/70"
                                placeholder={translations[language].rainfallPlaceholder}
                                name="rainfall"
                                value={formData.rainfall}
                                onChange={handleOnchange}
                                required
                            />
                            <Cloud className="absolute left-3 top-3.5 h-5 w-5 text-blue-500 dark:text-blue-400" />
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

export default CropAdviceForm;