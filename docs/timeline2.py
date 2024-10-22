import plotly.figure_factory as ff
import pandas as pd

# Create a list of dictionaries representing the tasks
tasks = [
    dict(Task='Requirement Analysis', Start='2024-09-11', Finish='2024-09-24', Resource='Planning'),
    dict(Task='Buffer for Requirement Analysis', Start='2024-09-25', Finish='2024-10-01', Resource='Planning'),
    dict(Task='Project Setup', Start='2024-10-02', Finish='2024-10-08', Resource='Planning'),
    dict(Task='Design', Start='2024-10-09', Finish='2024-10-15', Resource='Planning'),
    dict(Task='Frontend Development', Start='2024-10-16', Finish='2024-10-29', Resource='Development'),
    dict(Task='Backend Development', Start='2024-10-30', Finish='2024-11-12', Resource='Development'),
    dict(Task='Database Setup', Start='2024-11-13', Finish='2024-11-26', Resource='Development'),
    dict(Task='Integration', Start='2024-11-27', Finish='2024-12-10', Resource='Development'),
    dict(Task='Buffer for Development', Start='2024-12-11', Finish='2024-12-17', Resource='Development'),
    dict(Task='Unit Testing', Start='2024-12-18', Finish='2024-12-31', Resource='Testing'),
    dict(Task='Integration Testing', Start='2025-01-01', Finish='2025-01-07', Resource='Testing'),
    dict(Task='User Acceptance Testing', Start='2025-01-08', Finish='2025-01-14', Resource='Testing'),
    dict(Task='Buffer for Testing', Start='2025-01-15', Finish='2025-01-21', Resource='Testing'),
    dict(Task='Deployment to AWS', Start='2025-01-22', Finish='2025-01-28', Resource='Deployment'),
    dict(Task='Launch', Start='2025-01-29', Finish='2025-02-04', Resource='Deployment'),
    dict(Task='Buffer for Deployment', Start='2025-02-05', Finish='2025-02-11', Resource='Deployment'),
    dict(Task='Maintenance and Updates', Start='2025-02-12', Finish='2025-03-12', Resource='Maintenance'),
]

# Convert the list of tasks into a DataFrame
df = pd.DataFrame(tasks)

# Create the Gantt chart
fig = ff.create_gantt(df, index_col='Resource', show_colorbar=True, group_tasks=True)

# Update the layout of the chart
fig.update_layout(
    title='Arabic Psychometrics and Surveys Application Project Plan',
    xaxis_title='Date',
    yaxis_title='Tasks',
    xaxis=dict(
        tickformat="%Y-%m-%d",
        tickangle=45,
    ),
    height=600,
)

# Show the Gantt chart
fig.show()
