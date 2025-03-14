import React from 'react';
import { useState } from 'react';

function Yield_form() {

    const [formData, setformData] = useState({
        crop : "", 
        crop_year : "", 
        season : "", 
        state : "", 
        area : "",
        production : "",
        annual_rainfall : "",
        fertilizer : "",
        pesticide : "",
    })
    const handleOnchange = (event) => {
        setformData({...formData , [event.target.name] : event.target.value})
    }

    const handleSubmit =  async (event) => {
        event.preventDefault()
        console.log("dosometing")
        let response = await fetch("http://127.0.0.1:5000/predict" , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({crop : formData.crop ,
                crop_year : formData.crop_year , 
                season : formData.season , 
                state : formData.state , 
                area : formData.area , 
                production : formData.production , 
                annual_rainfall : formData.annual_rainfall,
                fertilizer : formData.fertilizer,
                pesticide : formData.pesticide
            })
        })
        let json_ = await response.json()
        // console.log(json_)
        // setformData({
        //     crop : "", 
        //     crop_year : "", 
        //     season : "", 
        //     state : "", 
        //     area : "",
        //     production : "",
        //     annual_rainfall : "",
        //     fertilizer : "",
        //     pesticide : "",
        // })
    }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Yield Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Crop</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter crop name" name='crop' value={formData.crop} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Crop Year</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter crop year" name='crop_year' value={formData.crop_Year} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Season</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter season" name='season' value={formData.season} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">State</label>
          <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter state" name='state' value={formData.state} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Area (in hectares)</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter area" name='area' value={formData.area} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Production (in metric tons)</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter production" name='production' value={formData.production} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Annual Rainfall (in mm)</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter annual rainfall" name='annual_rainfall' value={formData.annual_rainfall} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Fertilizer Used (kg/ha)</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter fertilizer used" name='fertilizer' value={formData.fertilizer} onChange={handleOnchange}/>
        </div>

        <div>
          <label className="block text-gray-700">Pesticide Used (kg/ha)</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter pesticide used" name='pesticide' value={formData.pesticide} onChange={handleOnchange}/>
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={(e)=>handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}

export default Yield_form;