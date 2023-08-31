import openpyxl
from faker import Faker
import random

# Initialize the Faker instance
fake = Faker()

# Create a new workbook and select the active sheet
workbook = openpyxl.Workbook()
sheet = workbook.active

# Add headers
headers = [
    "AreaSQM", "PHP(1.00)", "Number of Floors",
    "Bedrooms", "Carport", "Yard",
    "Finish"
    ]
sheet.append(headers)

minArea = 1.00
maxArea = 3.00


# Generate and populate sample data
num_rows = 1000  # Number of rows of data
for _ in range(num_rows):
    AreaSQM = fake.random_int(min=100, max=300)
    PiM = round(random.uniform(minArea, maxArea), 2)
    NoF = fake.random_int(min=1, max=2)
    NoB = fake.random_int(min=2, max=3)
    Carport = fake.random_int(min=0, max=2)
    Yard = fake.random_int(min=0, max=1)
    # ToF = fake.random_int(min=1, max=4)
    row_data = [AreaSQM, PiM, NoF, NoB, Carport, Yard]
    sheet.append(row_data)

    

# Save the workbook to a file
workbook.save("fake_data.xlsx")
