# 📘 StudentDiary — Academic Management System

<p align="center">
  A full-stack academic management system for managing students, homework, and automated notifications.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation--setup">Setup</a> •
  <a href="#-api-overview">API</a> •
  <a href="#-future-improvements">Roadmap</a>
</p>

---

## 🚀 Features

- 📚 Student & Homework Management
- 🧾 Relational database design (PostgreSQL)
- 🔔 Automated notifications (mail + reports)
- ⏱️ Cron-based scheduling system
- 🧠 Scalable MVC backend architecture
- 🔐 Authentication & RBAC (planned)
- 🎨 Responsive UI with modern frontend stack

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Backend    | Node.js, Express, TypeScript   |
| Database   | PostgreSQL (Neon), Drizzle ORM |
| Frontend   | React / Next.js, Tailwind CSS  |
| Automation | node-cron                      |
| Tools      | Git, Postman, Vercel, Render   |

---

## 📂 Project Structure

```
studentdiary/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── jobs/
│   └── utils/
├── config/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/studentdiary.git
cd studentdiary
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
NEON_URI=your_postgresql_url
FRONTEND_URI=your frontend url
PORT=5000
```

### 4. Run the server

```bash
npm run dev
```

---

## 🔌 API Overview

### Students

| Method | Endpoint                                  | Description           |
| ------ | ----------------------------------------- | --------------------- |
| GET    | /api/v1/students                          | Fetch all students    |
| POST   | /api/v1/students                          | Create a new student  |
| GET    | /api/v1/student/:id                       | Get student by ID     |
| PATCH  | /api/v1/student                           | Update student        |
| GET    | /api/v1/student/:studentId/scheduled-jobs | Get scheduled jobs    |
| GET    | /api/v1/student/:studentId/analytics      | Get student analytics |

### Homeworks

| Method | Endpoint                                | Description                 |
| ------ | --------------------------------------- | --------------------------- |
| POST   | /api/v1/homeworks                       | Create multiple homeworks   |
| GET    | /api/v1/homeworks                       | Get all homeworks           |
| GET    | /api/v1/homeworks/:studentId            | Get homeworks by student ID |
| PUT    | /api/v1/homeworks/:id                   | Update homework description |
| GET    | /api/v1/homework/:id                    | Get homework by ID          |
| PATCH  | /api/v1/homework/:studentId/:homeworkId | Update homework             |

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | /students | Fetch all students  |
| POST   | /students | Create a student    |
| GET    | /homework | Fetch homework list |
| POST   | /homework | Assign homework     |

---

## 🔄 Automation System

- Runs scheduled background jobs using cron( planned to transform into Queue)
- Handles:
  - 📩 Weekly reports
  - 📲 email notifications
- Designed for async and scalable execution

---

## 📈 Future Improvements

- 🔐 Authentication & RBAC system
- 🏫 Multi-tenant (multi-school support)
- 📱 Mobile optimization

---

## 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repo
# Create a new branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Belal Hossain**

- GitHub: https://github.com/ak0384221
- LinkedIn: https://linkedin.com/in/md-bellal-hossain-50a027373

---

<p align="center">⭐ Star this repo if you found it useful</p>
