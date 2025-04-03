import React, { useEffect, useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";

function Cnn() {
  const [medicinData, setmedicinData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [language, setLanguage] = useState("hindi");
  const translations = {
    english: {
      uploadPhoto: "Upload a Photo",
      uploadButton: "Upload",
      price: "Price",
      website: "Website",
    },
    hindi: {
      uploadPhoto: "फोटो अपलोड करें",
      uploadButton: "अपलोड करें",
      price: "मूल्य",
      website: "वेबसाइट",
    },
  };
  const getfromcnn = () => {
    return "raj";
  };

  const cnn = async (event) => {
    event.preventDefault()
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput.files.length) {
        console.error("No file selected");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:5000/cn", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.error("Error uploading file:", error);
    }
    addToDiv()
  }

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

  const filterItemsByName = (name) => {
    return medicinData.filter(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  };

  const addToDiv = () => {
    var searchName = getfromcnn();
    searchName = "Emoctan";
    document.getElementById("addtodivv").innerHTML = "";
    setFilteredItems(filterItemsByName(searchName));
  };

  return (
    <>
      {/* Upload Form */}
      
      <BackgroundWrapper>
              <div className="mx-auto mt-10 p-6 bg-green-100 rounded-lg shadow-md w-96 h-45 text-center">
                {/* Step 3: Add flex container for title and translation button */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {translations[language].uploadPhoto} {/* Dynamic title */}
                  </h3>
                  {/* Step 3: Translation button styled to match theme */}
                  <button
                    onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
                    className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-800 transition-colors duration-300"
                  >
                    {language === "english" ? "हिंदी" : "English"}
                  </button>
                </div>
                <form className="flex flex-col items-center mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="mb-3 p-2 border rounded-md w-full cursor-pointer"
                  />
                  <button
                    className="bg-green-700 text-white px-5 py-2 rounded-md shadow hover:bg-green-800"
                    onClick={(event) => cnn(event)}
                  >
                    {translations[language].uploadButton}
                  </button>
                </form>
              </div>
              <div id="addtodivv" className="flex flex-wrap gap-4 justify-center mt-5 p-5">
                {filteredItems.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg shadow-md bg-gray-100 w-52 text-center"
                  >
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">
                      {translations[language].price}: {item.price} {/* Dynamic label */}
                    </p>
                    <p className="text-gray-600">
                      {translations[language].website}: {item.website} {/* Dynamic label */}
                    </p>
                  </div>
                ))}
              </div>
            </BackgroundWrapper>
    </>
  );
}

export default Cnn;