import torch
from CNN import PlantDiseaseModel  # Import your model class

device = "cpu"
model = PlantDiseaseModel().to(device)  # Initialize model
print(model.state_dict().keys())  # Print expected state_dict keys
