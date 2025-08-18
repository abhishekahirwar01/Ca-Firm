# 📌 CA Firm Management System

A full-stack web application for **CA firms** to manage clients, staff, and administrative tasks.  
The system provides **role-based authentication & dashboards** with access control for various services.

---

## 🚀 Features

- 🔐 **Role-Based Authentication**

  - **CA (Chartered Accountant)** → Full access to all services
  - **Admin** → Manage users, permissions, and system settings
  - **Client** → Limited access (reports, invoices, PDF viewer, analytics)
  - **Staff** → Task management, reporting, document handling

- 🖥️ **Role-Based Dashboards**

  - Each role is redirected to its **own dashboard** after login
  - Clean UI with role-specific navigation and permissions

- 📂 **Services & Modules**
  - **FCA (Financial & Compliance Automation)**
  - **Tumbledy (Document & File Management)**
  - **PDF Viewer** (upload & preview documents)
  - **Reports & Analytics** (charts, graphs, KPIs)
  - **Task Management** (assign, track, and complete tasks)

---

## 🏗️ Tech Stack

**Frontend:** React.js, Vite, React Router, Axios, Tailwind / MUI  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Auth:** JWT (JSON Web Token), bcrypt for password hashing

---

## 🔑 Roles & Permissions

| Role   | Access                                                                  |
| ------ | ----------------------------------------------------------------------- |
| CA     | Full access to all modules (FCA, Reports, Analytics, Tasks, PDF Viewer) |
| Admin  | User management, permissions, service monitoring                        |
| Client | View reports, access PDF Viewer, limited analytics                      |
| Staff  | Task management, basic document access                                  |

---

## 🔄 Workflow

1. **User Registration/Login** → Choose role (**CA / Admin / Client / Staff**)
2. **Redirect to Dashboard** → Based on role, user is redirected to their dashboard
3. **Role Permissions** → Each dashboard shows only the services allowed for that role

---

## 📝 Pages

- Landing Page (Public)
- Register / Login
- Dashboards (Role Based)
- Services (FCA, PDF Viewer, Reports, Analytics, Task Management)

---

---

## ⚙️ Setup & Installation

```bash
# Clone repo
git clone https://github.com/abhishekahirwar01/Ca-Firm

# Install dependencies
cd frontend && npm install
cd backend && npm install

# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm run dev
```
