import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter

# Define the project timeline data with buffers
tasks = [
    {"Phase": "Planning", "Task": "Requirement Analysis", "Start": "2024-06-03", "End": "2024-06-16"},
    {"Phase": "Planning", "Task": "Buffer for Requirement Analysis", "Start": "2024-06-17", "End": "2024-06-23"},
    {"Phase": "Planning", "Task": "Project Setup", "Start": "2024-06-24", "End": "2024-06-30"},
    {"Phase": "Planning", "Task": "Design", "Start": "2024-07-01", "End": "2024-07-07"},
    {"Phase": "Development", "Task": "Frontend Development", "Start": "2024-07-08", "End": "2024-07-21"},
    {"Phase": "Development", "Task": "Backend Development", "Start": "2024-07-22", "End": "2024-08-04"},
    {"Phase": "Development", "Task": "Database Setup", "Start": "2024-08-05", "End": "2024-08-18"},
    {"Phase": "Development", "Task": "Integration", "Start": "2024-08-19", "End": "2024-09-01"},
    {"Phase": "Development", "Task": "Buffer for Development", "Start": "2024-09-02", "End": "2024-09-08"},
    {"Phase": "Testing", "Task": "Unit Testing", "Start": "2024-09-09", "End": "2024-09-22"},
    {"Phase": "Testing", "Task": "Integration Testing", "Start": "2024-09-23", "End": "2024-09-29"},
    {"Phase": "Testing", "Task": "User Acceptance Testing", "Start": "2024-09-30", "End": "2024-10-06"},
    {"Phase": "Testing", "Task": "Buffer for Testing", "Start": "2024-10-07", "End": "2024-10-13"},
    {"Phase": "Deployment", "Task": "Deployment to AWS", "Start": "2024-10-14", "End": "2024-10-20"},
    {"Phase": "Deployment", "Task": "Launch", "Start": "2024-10-21", "End": "2024-10-27"},
    {"Phase": "Deployment", "Task": "Buffer for Deployment", "Start": "2024-10-28", "End": "2024-11-03"},
    {"Phase": "Maintenance", "Task": "Maintenance and Updates", "Start": "2024-11-04", "End": "2024-12-31"}
]

# Create a DataFrame
df = pd.DataFrame(tasks)

# Convert Start and End columns to datetime
df['Start'] = pd.to_datetime(df['Start'])
df['End'] = pd.to_datetime(df['End'])

# Create the Gantt chart
fig, ax = plt.subplots(figsize=(12, 8))

# Plot the bars
for i, task in df.iterrows():
    ax.barh(task['Task'], task['End'] - task['Start'], left=task['Start'])

# Set labels and title
ax.set_xlabel('Date')
ax.set_ylabel('Task')
ax.set_title('Project Gantt Chart with Buffers')

# Format the x-axis to show dates nicely
ax.xaxis.set_major_formatter(DateFormatter("%Y-%m-%d"))

# Rotate date labels
plt.xticks(rotation=45)

# Add gridlines
ax.grid(True)

# Display the chart
plt.tight_layout()
plt.show()
