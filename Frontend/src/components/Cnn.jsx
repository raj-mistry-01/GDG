import React, { useEffect, useState } from "react";
import BackgroundWrapper from "./BackgroundWrapper";

function Cnn() {
  const [medicinData, setmedicinData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const getfromcnn = () => {
    return "raj";
  };

  const cnn = () => {
    event.preventDefault()
    console.log("do something")
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
    let searchName = getfromcnn();
    searchName = "Emoctan";
    document.getElementById("addtodivv").innerHTML = "";
    setFilteredItems(filterItemsByName(searchName));
  };

  return (
    <>
      {/* Upload Form */}
      
      <BackgroundWrapper>
      <div className="mx-auto mt-10 p-6 bg-green-100 rounded-lg shadow-md w-96 h-45 text-center">
        <h3 className="text-lg font-semibold">Upload a Photo</h3>
        <form className="flex flex-col items-center mt-4">
          <input 
            type="file" 
            accept="image/*" 
            className="mb-3 p-2 border rounded-md w-full cursor-pointer"
          />
          <button  className="bg-green-700 text-white px-5 py-2 rounded-md shadow hover:bg-green-800" onClick={()=>{cnn(event)}}>
            Upload
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
              <p className="text-gray-600">Price: {item.price}</p>
              <p className="text-gray-600">Website: {item.website}</p>
            </div>
          ))}
        </div>
        </BackgroundWrapper>
    </>
  );
}

export default Cnn;