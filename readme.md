# **Learnik - Online Learning System**

This project is an online education system, providing courses, managing users, quizzes, and allowing course analysis through AI. The system uses **React** for the frontend, **Node.js** for the backend, and **MongoDB** for data storage. Additionally, it integrates **VietQR** for payment processing.

## **1. Project Description**

This project provides the following features:

- Course management (Create, Update, Delete courses)
- User management (Students, Instructors)
- Quiz system and grades
- Course analysis via AI
- Search and filter courses by category, status, and name
- **VietQR Payment Integration** for course registration

## **2. Project Structure**

### **Frontend (React)**

1. **Pages**: Pages that display courses, manage courses, quizzes, etc.
   - `/pages/SubjectList`: List of courses.
   - `/pages/SubjectDetail`: Course details.
2. **Components**: Reusable components across the pages like `Sidebar`, `CourseTable`, `AIModal`.
3. **API**: Interaction with the backend using `axios`.

4. **Routing**: Managed by `react-router-dom`.

### **Backend (Node.js & Express)**

1. **Routes**: API routes for managing courses, users, quizzes, etc.

   - `GET /api/v1/courses`: Get all courses.
   - `POST /api/v1/ai-analysis`: AI course analysis requests.
   - `POST /api/v1/payment`: Handles VietQR payment initiation and status updates.

2. **Controllers**: Business logic handling for backend processes.
3. **Services**: Services for interacting with the database and external APIs (OpenAI, VietQR).
4. **Models**: MongoDB models for courses, users, and other entities.

### **Database (MongoDB)**

- **Courses**: Each course includes information like title, description, instructor, lessons, status, and enrolled students.
- **Users**: Manages user information with different roles (students, instructors, admin).
- **Payments**: Stores payment transactions from VietQR for course registration.

## **3. Installation**

### **Backend Installation**

1. **Install dependencies**:

   ```bash
   cd backend
   npm install
   ```

2. **Configure Database**:

   - Ensure you have MongoDB running or configure MongoDB Atlas.
   - Update the configuration information in the `config/config.js` file.

3. **Configure VietQR**:

   - Ensure you have a valid **VietQR API key** and configure it in the `config/config.js` file.
   - Add your **VietQR Merchant Information** to process payments.

4. **Run Backend**:

   ```bash
   npm run dev
   ```

   - The backend will run on port `4000`.

### **Frontend Installation**

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Run Frontend**:

   ```bash
   npm start
   ```

   - The frontend will run on port `3000`.

3. **Configure environment**:
   - Update the API URLs in `src/config/axios.js` to match your backend.

## **4. Key Features**

1. **Create, Update, Delete Courses**:
   - Manage course listings with CRUD functionalities.
2. **User Management**:

   - Role-based access (students, instructors, admin).

3. **AI Course Analysis**:
   - Use OpenAI API to analyze courses and suggest improvements.
4. **Search and Filter**:

   - Search for courses and filter by category, status, etc.

5. **VietQR Payment Integration**:
   - **Initiate Payment**: Users can register for courses and initiate payments using VietQR.
   - **Payment Status**: After successful payment, the course registration status is updated in the system.
   - **Payment Gateway**: The payment is processed using the **VietQR API** for secure transactions.

## **5. Technologies Used**

- **Frontend**: React, React Router, Ant Design, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **AI Integration**: OpenAI API (GPT-4)
- **Payment Integration**: VietQR API for secure payment processing
- **Authentication**: JWT (JSON Web Token)

## **6. Useful Commands**

- **Run Backend**:
  ```bash
  npm run dev
  ```
- **Run Frontend**:

  ```bash
  npm start
  ```

- **Build Frontend**:
  ```bash
  npm run build
  ```

## **7. License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
