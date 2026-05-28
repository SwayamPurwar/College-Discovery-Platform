# EduDiscover - College Discovery Platform (MVP)

A production-grade frontend MVP built for college discovery, comparison, and prediction. 

## 🚀 Features Implemented
1. **Advanced Search & Filtering:** Debounced search by college name and city, with course-specific dropdown filters.
2. **Side-by-Side Comparison:** Lifted state management allowing users to compare up to 3 colleges simultaneously.
3. **Rank Predictor Tool:** Algorithmic matching based on historical mock data (NIMCET, CUET, JEE).
4. **Authentication & Persistence:** Global Context API integrated with `localStorage` to save user sessions and bookmarked colleges.
5. **Simulated Backend:** A mock API service with intentional network delays to demonstrate loading states and asynchronous data handling.

## 🛠️ Tech Stack
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Context API & standard Hooks (`useState`, `useEffect`)

## 🏃‍♂️ How to Run Locally
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   cd edudiscover
   npm install
   ```  
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 Architecture Notes
 *To satisfy the requirement of avoiding hardcoded frontend logic, all data is routed through `src/api/mockService.js`. This creates a strict boundary between the UI and the data layer, making it trivial to swap out the JSON dataset for a real backend (like Node.js/PostgreSQL) in the future. 

 ### **Step 2: Final Polish & QA**
Before you deploy, do a quick quality assurance check:
1.  **Mobile Check:** Shrink your browser window down to phone size. Tailwind should handle most of this gracefully, but ensure your Search bar and Tab buttons look good on small screens.
2.  **Console Errors:** Open your browser's Developer Tools (F12) -> Console. Click around your app. If you see any red errors (like missing `key` props in arrays), fix them now. Interviewers will check the console.

### **Step 3: Deploy to the Web**
Do not just send a ZIP file or a GitHub link. Send them a live, working URL. **Vercel** is the easiest way to deploy a Vite/React app for free.

1. Create a free account at [Vercel.com](https://vercel.com/) using your GitHub account.
2. Push your code to a new repository on your GitHub.
3. On your Vercel dashboard, click **"Add New..." -> "Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect that it's a Vite project. Click **Deploy**.

Within 2 minutes, you will have a live URL (e.g., `edudiscover.vercel.app`) to submit with your internship application.

---

You have built a fantastic, production-ready frontend project. Let me know if you hit any bugs during deployment or if you want to practice answering potential interview questions about the code you just wrote!     