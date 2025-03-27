import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
# Define Residual Block (copied from CNN.py)

idx_to_class = {
    0: "Apple___Black_rot",
    1: "Apple___Healthy",
    2: "Apple___Scab",
    3: "Bell_pepper___Bacterial_spot",
    4: "Bell_pepper___Healthy",
    5: "Cedar_apple_rust",
    6: "Cherry___Healthy",
    7: "Cherry___Powdery_mildew",
    8: "Citrus___Black_spot",
    9: "Citrus___canker",
    10: "Citrus___greening",
    11: "Citrus___Healthy",
    12: "Corn___Common_rust",
    13: "Corn___Gray_leaf_spot",
    14: "Corn___Healthy",
    15: "Corn___Northern_Leaf_Blight",
    16: "Grape___Black_Measles",
    17: "Grape___Black_rot",
    18: "Grape___Healthy",
    19: "Grape___Isariopsis_Leaf_Spot",
    20: "Peach___Bacterial_spot",
    21: "Peach___Healthy",
    22: "Potato___Early_blight",
    23: "Potato___Healthy",
    24: "Potato___Late_blight",
    25: "Strawberry___Healthy",
    26: "Strawberry___Leaf_scorch",
    27: "Tomato___Bacterial_spot",
    28: "Tomato___Early_blight",
    29: "Tomato___Healthy",
    30: "Tomato___Late_blight",
    31: "Tomato___Leaf_Mold",
    32: "Tomato___Mosaic_virus",
    33: "Tomato___Septoria_leaf_spot",
    34: "Tomato___Spider_mites",
    35: "Tomato___Target_Spot",
    36: "Tomato___Yellow_Leaf_Curl_Virus"
}
class ResidualBlock(nn.Module):
    def __init__(self, filters):  # Fixed typo: _init_ to __init__
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(filters, filters, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(filters)
        self.conv2 = nn.Conv2d(filters, filters, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(filters)
        self.relu = nn.ReLU(inplace=True)
    
    def forward(self, x):
        shortcut = x
        x = self.conv1(x)
        x = self.relu(x)
        x = self.bn1(x)
        x = self.conv2(x)
        x = self.bn2(x)
        x = x + shortcut
        x = self.relu(x)
        return x

# Define the Model (copied from CNN.py)
class PlantDiseaseModel(nn.Module):
    def __init__(self, num_classes=37):  # Fixed typo: _init_ to __init__
        super(PlantDiseaseModel, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 32, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(32)
        self.pool1 = nn.MaxPool2d(2, 2)
        self.res1 = ResidualBlock(32)
        
        self.conv3 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(64)
        self.conv4 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        self.bn4 = nn.BatchNorm2d(64)
        self.pool2 = nn.MaxPool2d(2, 2)
        self.res2 = ResidualBlock(64)
        
        self.conv5 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn5 = nn.BatchNorm2d(128)
        self.conv6 = nn.Conv2d(128, 128, kernel_size=3, padding=1)
        self.bn6 = nn.BatchNorm2d(128)
        self.pool3 = nn.MaxPool2d(2, 2)
        self.res3 = ResidualBlock(128)
        
        self.global_avg_pool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc1 = nn.Linear(128, 256)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(256, num_classes)
        self.relu = nn.ReLU(inplace=True)
    
    def forward(self, x):
        x = self.conv1(x)
        x = self.relu(x)
        x = self.bn1(x)
        x = self.conv2(x)
        x = self.relu(x)
        x = self.bn2(x)
        x = self.pool1(x)
        x = self.res1(x)
        
        x = self.conv3(x)
        x = self.relu(x)
        x = self.bn3(x)
        x = self.conv4(x)
        x = self.relu(x)
        x = self.bn4(x)
        x = self.pool2(x)
        x = self.res2(x)
        
        x = self.conv5(x)
        x = self.relu(x)
        x = self.bn5(x)
        x = self.conv6(x)
        x = self.relu(x)
        x = self.bn6(x)
        x = self.pool3(x)
        x = self.res3(x)
        
        x = self.global_avg_pool(x)
        x = x.view(x.size(0), -1)
        x = self.fc1(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        return x

# Set device (CPU/GPU)


def getfromcnn(image_path) :
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # Initialize the model
    model = PlantDiseaseModel(num_classes=37).to(device)
    model_path = "PlantDiseaseDetectionCNN_final.pth"

    try:
        checkpoint = torch.load(model_path, map_location=device)
        model.load_state_dict(checkpoint)
        model.eval()  # Set model to evaluation mode
        print("Model loaded successfully!")
    except RuntimeError as e:
        print("Error loading model:", e)
        exit()

    # Define image preprocessing (match training size: 128x128)
    transform = transforms.Compose([
        transforms.Resize((128, 128)),  # Match training input size
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Match training normalization
    ])

    # Load and preprocess input image
    # Change this to your input image path
    try:
        image = Image.open(image_path).convert("RGB")
        image = transform(image).unsqueeze(0).to(device)  # Add batch dimension
    except Exception as e:
        print("Error loading image:", e)
        exit()

    # Perform inference
    with torch.no_grad():
        output = model(image)
        predicted_class = torch.argmax(output, dim=1).item()

    return idx_to_class[predicted_class]


if __name__ == "__main__" : 
    print("ys")
    image_path =  r".\test_image\\cc1.jpeg"  
    pc = getfromcnn(image_path=image_path)
    print(" pr class : " , idx_to_class[pc])
    print(pc)