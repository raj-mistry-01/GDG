import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image

# Define Residual Block (copied from CNN.py)
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
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Initialize the model
model = PlantDiseaseModel(num_classes=37).to(device)
model_path = "PlantDiseaseDetectionCNN_final.pth"

# Load the trained model
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
image_path = "test_image.jpg"  # Change this to your input image path
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

# Print model output
print(f"Predicted class index: {predicted_class}")

# Optional: Map the predicted class index to a label (if you have a class list)
# Example: Replace with your actual class names
# class_names = train_dataset.classes  # You need to load this from your dataset or define it manually
# print(f"Predicted class name: {class_names[predicted_class]}")