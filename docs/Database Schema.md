
# Estebian Project: Final Database Design and Data Flow

## Project Overview:
The Estebian project focuses on creating surveys composed of demographic questions and psychometric tests, which consist entirely of multiple-choice questions. These surveys are distributed to participants, whose responses are collected for analysis. Each survey is tied to a set of psychometric tests, and each psychometric test is composed of dimensions and associated multiple-choice questions. The project leverages AWS DynamoDB for storing data in a NoSQL format to ensure scalability and efficiency.

## Data Relationships:
1. **Users**: Users create surveys and psychometric tests. Users are authenticated via AWS Cognito, so passwords and sensitive data are not stored in DynamoDB. DynamoDB stores the user's created surveys and psychometric tests.
   
2. **Surveys**: A survey is created by a user and consists of demographic questions and one or more psychometric tests. Each survey is used only once for collecting responses. Surveys store basic metadata like title, description, and list of questions.
   
3. **Psychometric Tests**: A psychometric test is a reusable component that consists of multiple-choice questions based on one or more dimensions (e.g., Anxiety, Stress). Each psychometric test includes predefined choices with corresponding marks, which define the scoring system for each test.
   
4. **Questions**: Both demographic and psychometric questions are stored within the survey. Psychometric test questions have a scoring mechanism where each choice corresponds to a mark. Some questions are marked as "opposite" to indicate reverse scoring.
   
5. **Survey Responses**: Each participant's response is stored as a separate entity. This structure allows for scalability by keeping each response isolated in its own item (row) within the database. Each participant's answers, along with their corresponding marks, are stored under the respective survey.

---

## Final DynamoDB Schema:

---

### 1. Users Table
- **Partition Key (PK):** `USER#<UserID>`
- **Attributes:**
  - `UserID`: Unique identifier for the user (from Cognito).
  - `Email`: User's email.
  - `Name`: Optional, user's name.
  - `CreatedSurveys`: List of survey IDs created by the user.
  - `CreatedTests`: List of psychometric test IDs created by the user.
  - `CreationDate`: Date when the user profile was created.

---

### 2. Surveys Table
- **Partition Key (PK):** `SURVEY#<SurveyID>`
- **Attributes:**
  - `SurveyID`: Unique identifier for the survey.
  - `UserID`: ID of the user who created the survey.
  - `Title`: Survey title.
  - `Description`: Survey description.
  - **Questions**: A list of questions, where each question includes:
    - `QuestionID`: Unique identifier for the question.
    - `Text`: Question text.
    - `Type`: Type of the question (e.g., text, multiple choice).
    - **Choices**: List of multiple-choice options (for psychometric questions), with corresponding marks for each choice.
    - **IsOpposite**: Boolean flag indicating whether the question is opposite (for reverse marking).
  - **Psychometric Tests**: Embedded or referenced psychometric tests, each containing:
    - `TestID`: Unique identifier for the psychometric test.
    - **Dimensions**: A list of dimensions (e.g., Anxiety, Stress) for the psychometric test.
    - **Test Questions**: List of questions, where each question includes:
      - `QuestionID`: Unique identifier.
      - `Text`: The text of the question.
      - **Choices**: A list of choices with corresponding marks.
      - **IsOpposite**: Boolean indicating if the question should use reverse marking.
      - **Dimension**: The dimension the question belongs to.

---

### 3. Psychometric Tests Table
- **Partition Key (PK):** `TEST#<TestID>`
- **Attributes:**
  - `TestID`: Unique identifier for the psychometric test.
  - `UserID`: ID of the user who created the test.
  - `Title`: Test title.
  - **Dimensions**: A list of dimensions the psychometric test covers (e.g., Anxiety, Stress).
  - **Test Questions**: List of questions where each question has:
    - `QuestionID`: Unique identifier.
    - `Text`: The text of the question.
    - **Choices**: List of multiple-choice options and corresponding marks (e.g., أبدا = 1, نادرا = 2).
    - **IsOpposite**: Boolean flag to indicate reverse marking.
    - **Dimension**: The dimension associated with the question.

---

### 4. Survey Responses Table
- **Partition Key (PK):** `SURVEY#<SurveyID>`
- **Sort Key (SK):** `PARTICIPANT#<ParticipantID>`
- **Attributes:**
  - `SurveyID`: ID of the survey this response belongs to.
  - `ParticipantID`: Unique identifier for the participant.
  - **Answers**: A list of answers, where each answer includes:
    - `QuestionID`: The ID of the question.
    - `Answer`: The participant’s selected answer.
    - `Mark`: The corresponding mark for the selected choice.
  - **Timestamp**: Date and time when the response was submitted.

---

## Data Flow:
1. **User Creation**: Users register and log in via AWS Cognito. User profiles, including created surveys and tests, are stored in DynamoDB.
   
2. **Survey Creation**: A user creates a survey by selecting or creating psychometric tests and adding demographic questions. All questions, psychometric tests, and scoring systems are stored in the Surveys table.
   
3. **Psychometric Test Creation**: Users can create psychometric tests by defining questions, dimensions, and corresponding marking techniques (normal and opposite scoring). These tests are stored in the Psychometric Tests table and can be reused across multiple surveys.
   
4. **Survey Participation**: Participants take the survey by answering the demographic and psychometric questions. Each participant's answers are saved as a separate row in the Survey Responses table, linked to the respective survey.
   
5. **Response Analysis**: User can retrieve responses for a specific survey by querying the Survey Responses table. Each participant's responses are tied to the survey, and scoring is computed based on the predefined marking system.

---

## Advantages of This Schema:
1. **Efficient Data Retrieval**: Survey responses and psychometric test details are structured to minimize data redundancy while allowing for easy querying and retrieval of responses.
2. **Scalability**: The separation of participant responses into individual rows ensures the system can handle large-scale surveys without exceeding DynamoDB’s item size limits.
3. **Flexible Psychometric Structure**: Each psychometric test can have its own marking system, and the flexibility to add dimensions ensures that the system can handle complex analysis.

---

This design provides a scalable, efficient way to manage surveys, psychometric tests, and participant responses while leveraging DynamoDB’s strengths.
