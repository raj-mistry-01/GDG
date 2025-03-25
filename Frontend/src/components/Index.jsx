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
      button: "Switch to Hindi",
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
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "hi" : "en"))
  }

  return (
    <>
      <BackgroundWrapper>
        <div className="flex h-screen w-600" style={{ borderRadius: "20%" }}>
          <div ref={scrollRef} className="w-1/2 h-screen overflow-y-scroll hide-scrollbar snap-y snap-mandatory">
            <div
              className="h-screen flex flex-col items-center justify-center bg-green-800 snap-start transform hover:scale-101 transition duration-300"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1607460694867-af0c6d6f2c52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                opacity: "0.89",
                borderStartStartRadius: "15%",
              }}
            >
              <div className="text-white p-6 rounded-2xl max-w-3xl mx-auto">
                <br />
                <br />
                <h2 className="text-2xl md:text-4xl font-extrabold mb-4 flex items-center">
                  {translations[language].title}
                </h2>
                <p className="text-xl font-bold leading-relaxed">{translations[language].description}</p>
                <ul className="mt-4 space-y-3 font-bold text-xl">
                  {translations[language].features.map((feature, index) => (
                    <li key={index} className="flex font-bold items-center">
                      -<span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <br />
                <br />
                <button
                  onClick={toggleLanguage}
                  className="mt-6 bg-green-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  {translations[language].button}
                </button>
              </div>
            </div>

            <div
              className="h-screen flex flex-col items-center justify-center snap-start transform hover:scale-101 transition duration-300 p-6"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black bg-opacity-60 p-8 rounded-xl w-full max-w-2xl space-y-8" style={{ opacity: "0.7" }}>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-3">{translations[language].yieldModel.title}</h3>
                  <p className="mb-4">{translations[language].yieldModel.description}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                    {translations[language].learnMore}
                  </button>
                </div>

                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-3">{translations[language].diseaseModel.title}</h3>
                  <p className="mb-4">{translations[language].diseaseModel.description}</p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                    {translations[language].learnMore}
                  </button>
                </div>
              </div>
            </div>

            <div
              className="h-screen flex items-center justify-center snap-start transform hover:scale-101 transition duration-300"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1625727264759-d79039702530?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl" style={{ opacity: "0.7" }}>
                <p className="text-lg text-white font-bold leading-relaxed">
                  <i>
                    Agriculture is the backbone of our global food supply, sustaining economies and communities by
                    providing essential resources for human survival. It not only ensures food security but also
                    supports livelihoods, especially for small and marginal farmers who depend on the land for their
                    income. However, unpredictable weather patterns, crop diseases, and inefficient traditional
                    practices continue to challenge these farmers. With the advent of artificial intelligence, we now
                    have the opportunity to revolutionize farming practices. AI-powered tools—ranging from yield
                    prediction models and plant disease detection systems to real-time weather monitoring and
                    intelligent chatbots can offer timely, precise, and personalized insights. This technological
                    advancement not only improves productivity and profitability but also helps in making informed
                    decisions, ultimately empowering farmers to overcome challenges and secure a sustainable future in
                    agriculture.
                  </i>
                </p>
              </div>
            </div>

            <div
              className="h-screen flex items-center justify-center bg-green-800 snap-start"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderEndStartRadius: "15%",
              }}
            >
              <div className="bg-black bg-opacity-50 p-6 rounded-lg max-w-2xl" style={{ opacity: "0.7" }}>
                 
              </div>
            </div>
          </div>

          <div
            className="w-1/2 flex flex-col items-center p-10 bg-green-900"
            style={{ borderStartEndRadius: "15%", borderEndEndRadius: "15%" }}
          >
            <h1 className="text-4xl text-white font-bold mb-4">
              <i>Welcome to NeuralAgri</i>
            </h1>
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Field"
              className="w-300 h-300"
              style={{ borderRadius: "15%" }}
            />
          </div>
        </div>
      </BackgroundWrapper>
    </>
  )
}

export default Index