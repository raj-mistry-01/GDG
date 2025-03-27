import { useState, useEffect, useRef } from "react"
import BackgroundWrapper from "./BackgroundWrapper"

function Index() {
  const translations = {
    en: {
      title: "🌾 Transforming Agriculture with AI",
      description:
        "Small and marginal farmers face challenges like unpredictable weather, crop diseases, and yield losses. AgriAI is here to change that!",
      features: [
        "Plant Disease Detection: Upload a leaf image & detect crop diseases instantly.",
        "Yield Prediction: Get AI-based crop yield estimates to plan effectively.",
        "AI Chatbot: Instant multilingual farming assistance in English and Hindi.",
      ],
      button: "हिंदी में अनुवाद के लिए",
      yieldModel: {
        title: "Yield Prediction Model",
        description:
          "Our AI-powered yield prediction model analyzes soil conditions, weather patterns, and historical data to provide accurate crop yield estimates, helping farmers plan their harvests and optimize resources effectively.",
      },
      diseaseModel: {
        title: "Plant Disease Detection",
        description:
          "Upload images of plant leaves to instantly identify diseases and get treatment recommendations. Our model is trained on thousands of plant disease samples to provide accurate diagnoses and actionable insights.",
      },
      learnMore: "Learn More",
      section3: {
        title: "🌾 Rooted in Tradition, Growing with Innovation",
        description:
          "Farming isn't just about growing crops. It's about growing dreams. Each seed you plant carries hope. Each harvest tells a story of patience, resilience, and hard work. We know the challenges—the unpredictable weather, the diseases that strike without warning, the uncertainty of yield. But what if technology could become your helping hand? With AI-driven solutions, we aim to give back to the heart of our food system—you, the farmer. Imagine a world where your plants tell you what they need, where risks are minimized before they happen, and where every decision is backed by knowledge, not just guesswork. This isn't just technology. This is a revolution, built for those who feed the world.",
        button: "Thank You!!!!",
      },
    },
    hi: {
      title: "🌾 एआई के साथ कृषि में बदलाव",
      description:
        "छोटे और सीमांत किसान अनिश्चित मौसम, फसल रोग और उपज हानि जैसी चुनौतियों का सामना करते हैं। AgriAI इसे बदलने के लिए यहाँ है!",
      features: [
        "पौधों के रोग की पहचान: एक पत्ती की छवि अपलोड करें और तुरंत फसल रोगों का पता लगाएं।",
        "उपज भविष्यवाणी: एआई-आधारित फसल उपज अनुमान प्राप्त करें और बेहतर योजना बनाएं।",
        "एआई चैटबॉट: हिंदी और अंग्रेजी में त्वरित कृषि सहायता।",
      ],
      button: "Switch to English",
      yieldModel: {
        title: "उपज भविष्यवाणी मॉडल",
        description:
          "हमारा एआई-संचालित उपज भविष्यवाणी मॉडल मिट्टी की स्थिति, मौसम पैटर्न और ऐतिहासिक डेटा का विश्लेषण करके सटीक फसल उपज अनुमान प्रदान करता है, जिससे किसानों को अपनी फसलों की योजना बनाने और संसाधनों का प्रभावी ढंग से अनुकूलन करने में मदद मिलती है।",
      },
      diseaseModel: {
        title: "पौधों के रोग की पहचान",
        description:
          "पौधों के पत्तों की छवियों को अपलोड करके तुरंत रोगों की पहचान करें और उपचार की सिफारिशें प्राप्त करें। हमारा मॉडल सटीक निदान और कार्रवाई योग्य अंतर्दृष्टि प्रदान करने के लिए हजारों पौधों के रोग के नमूनों पर प्रशिक्षित है।",
      },
      learnMore: "और जानें",
      section3: {
        title: "🌾 परंपरा में जड़ें, नवाचार के साथ उन्नति",
        description:
          "खेती सिर्फ फसल उगाने के बारे में नहीं है, यह सपनों को उगाने का नाम है। हर बोया गया बीज आशा का प्रतीक है। हर कटाई धैर्य, सहनशीलता और कड़ी मेहनत की कहानी कहती है। हम चुनौतियों को जानते हैं—अनिश्चित मौसम, अचानक आने वाले रोग, और उपज की अनिश्चितता। लेकिन अगर तकनीक आपकी मददगार बन जाए? एआई-संचालित समाधानों के साथ, हम आपके जैसे किसान को सशक्त बनाने के लिए प्रतिबद्ध हैं। कल्पना कीजिए एक ऐसी दुनिया की जहाँ आपके पौधे आपको बताएँ कि उन्हें क्या चाहिए, जहाँ जोखिम कम से कम हों और हर निर्णय ज्ञान पर आधारित हो, सिर्फ अनुमान पर नहीं। यह केवल तकनीक नहीं है, यह एक क्रांति है, उन लोगों के लिए जो दुनिया को भोजन देते हैं।",
        button: "धन्यवाद!!!!",
      },
    },
  }

  const [language, setLanguage] = useState("en")
  const scrollRef = useRef(null)
  const totalSections = 4

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSections
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: currentIndex * window.innerHeight,
          behavior: "smooth",
        })
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"))
  }

  return (
    <BackgroundWrapper>
      <div className="flex flex-col md:flex-row w-full" style={{ borderRadius: "20%" }}>
        <div
          ref={scrollRef}
          className="md:w-1/2 w-full md:h-screen overflow-y-scroll hide-scrollbar snap-y snap-mandatory"
        >
          <div
            className="md:h-screen flex flex-col items-center justify-center bg-green-800 snap-start transform hover:scale-101 transition duration-300 px-4 py-6"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1607460694867-af0c6d6f2c52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              opacity: "0.89",
              borderStartStartRadius: "15%",
            }}
          >
            <div className="text-white rounded-2xl max-w-3xl mx-auto">
              <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold mb-4 flex items-center">
                {translations[language].title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                {translations[language].description}
              </p>
              <ul className="mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base md:text-xl font-bold">
                {translations[language].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    -<span className="ml-1 sm:ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleLanguage}
                className="mt-4 sm:mt-6 bg-green-600 hover:bg-green-400 hover:text-black text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                {translations[language].button}
              </button>
            </div>
          </div>

          <div
            className="md:h-screen flex flex-col items-center justify-center snap-start transform hover:scale-101 transition duration-300 px-4 py-6"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="bg-black bg-opacity-60 p-4 sm:p-8 rounded-xl w-full max-w-2xl space-y-6 sm:space-y-8"
              style={{ opacity: "0.7" }}
            >
              <div className="text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {translations[language].yieldModel.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                  {translations[language].yieldModel.description}
                </p>
                <button className="bg-green-700 hover:bg-green-400 hover:text-black text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base">
                  {translations[language].learnMore}
                </button>
              </div>
              <div className="text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {translations[language].diseaseModel.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                  {translations[language].diseaseModel.description}
                </p>
                <button className="bg-green-700 hover:bg-green-400 hover:text-black text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base">
                  {translations[language].learnMore}
                </button>
              </div>
            </div>
          </div>
          <div
            className="md:h-screen flex items-center justify-center bg-green-800 snap-start px-4 py-6"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg max-w-2xl"
              style={{ opacity: "0.7" }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-3 sm:mb-4">
                {translations[language].section3.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white font-bold leading-relaxed">
                {translations[language].section3.description}
              </p>
              <button className="mt-3 sm:mt-4 bg-green-700 hover:bg-green-400 hover:text-black text-white font-bold py-2 px-4 sm:px-6 rounded-lg text-sm sm:text-base">
                {translations[language].section3.button}
              </button>
            </div>
          </div>
          <div
            className="md:h-screen flex items-center justify-center snap-start transform hover:scale-101 transition duration-300"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1625727264759-d79039702530?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderEndStartRadius: "15%",
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/IMG_4637.mp4"
                style={{borderEndStartRadius: "15%"}}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
        <div
          className="hidden md:flex md:w-1/2 flex-col items-center p-10 bg-green-900"
          style={{ borderStartEndRadius: "15%", borderEndEndRadius: "15%" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4">
            <i>Welcome to NeuralAgri</i>
          </h1>
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Field"
            className="w-full h-full object-cover"
            style={{
              borderStartEndRadius: "15%",
              borderEndEndRadius: "15%",
            }}
          />
        </div>

      </div>
    </BackgroundWrapper>
  )
}

export default Index;