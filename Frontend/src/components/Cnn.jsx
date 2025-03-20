import React, { useEffect, useState } from "react";

function Cnn() {
  const [medicinData, setmedicinData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const getfromcnn = () => {
    return "raj"
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
    searchName = "Emoctan"
    document.getElementById("addtodivv").innerHTML =  "";
    setFilteredItems(filterItemsByName(searchName));
  };

  return (
    <>
      <div>
        <h2>Filtered Medicines</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={getmeddata}>Refresh Data</button>
        <button onClick={addToDiv}>Add to Div</button>
        <div id="addtodivv" style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "10px" }}>
          {filteredItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#f9f9f9",
                width: "150px",
                textAlign: "center",
              }}
            >
              <h4>{item.name}</h4>
              <p>Price: {item.price}</p>
              <p>Website: {item.website}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cnn;
