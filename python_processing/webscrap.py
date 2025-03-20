import requests
import google.generativeai as genai
from bs4 import BeautifulSoup
import json

# Configure Google Gemini API

model = genai.GenerativeModel(model_name='gemini-1.5-flash')
genai.configure(api_key="AIzaSyAuiCAcfEyFfR8nPHrVwTVN7nxgS5YfSiU")
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
}

class MedicineScraper:
    """
    Scrapes a website and extracts medicine details based on the site's structure.
    """

    def __init__(self, url):
        self.url = url
        self.website_name = "Unknown"
        self.medicine_content = ""

        try:
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return

        soup = BeautifulSoup(response.content, 'html.parser')

        # Identify the website and select the correct class
        if "agribegri.com" in url:
            self.website_name = "Agribegri"
            product_details = soup.find_all('div', class_='product_details_wrap')
        elif "bighaat.com" in url:
            self.website_name = "BigHaat"
            product_details = soup.find_all('div', class_='w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 px-2 my-2 md:mb-5')
        elif "farmkart.com" in url:
            self.website_name = "FarmKart"
            product_details = soup.find_all('div', class_='card-wrapper product-card-wrapper underline-links-hover')
        else:
            print("Website not recognized.")
            return

        if product_details:
            self.medicine_content = "\n\n".join([detail.get_text(separator=" ", strip=True) for detail in product_details])
        else:
            print(f"No medicine details found on {self.website_name}.")

    def get_medicine_text(self):
        return self.medicine_content, self.website_name

def generate_medicine_json(medicine_text, website_name):
    """
    Sends the extracted medicine text to Gemini for structuring into JSON format.
    """
    prompt = f"""
    give only json the response should start with json directly no ```json
    You are a helpful AI assistant. Extract medicine names, prices(must be one value), and brands from the given text and return a structured JSON response in the following format:

    {{
        "website": "{website_name}",
        "medicines": [
            {{
                "name": "Medicine Name",
                "price": "Medicine Price",
                "brand": "Brand Name (if available)",
                "website": "{website_name}"
            }}
        ]
    }}

    Ignore any irrelevant information and provide accurate structured data.

    Here is the extracted medicine data:
    {medicine_text}
    """

    response = model.generate_content(prompt)
    return response.text if response.text else "Failed to generate JSON response."

def get_medicine_text():
    urls = [
        "https://agribegri.com/?srsltid=AfmBOopJqQAefg02y72bStydj6VIbkeBc9qkfJWCt78LKbIsajGOOzUB",
        "https://www.bighaat.com/collections/insecticides",
        "https://farmkart.com/collections/insecticides?page=1",
        "https://farmkart.com/collections/insecticides?page=2",
        "https://farmkart.com/collections/insecticides?page=3"
    ]
    meds=[]
    for url in urls:
        scraper = MedicineScraper(url)
        medicine_text, website_name = scraper.get_medicine_text()
        if medicine_text:
            formatted_json = generate_medicine_json(medicine_text, website_name)

            js = json.loads(formatted_json)

            for med in js["medicines"]:
                meds.append(med)
        else:
            print(f"No medicine details found on {website_name}.")
    return meds


if __name__ == "__main__" :    
    medicines = get_medicine_text() 
    print(medicines)