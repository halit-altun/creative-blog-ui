# DevJourney - Personal Portfolio & Blog

A modern, responsive full-stack web application built with React and Node.js, featuring a sleek cyberpunk-inspired design with dynamic animations and interactive elements.

Screenshot

![1](https://github.com/user-attachments/assets/e27571f4-bb77-4881-b31d-de235edcc93f)
![2](https://github.com/user-attachments/assets/c9310c67-863c-4a27-af31-bc81ac22153e)
![3](https://github.com/user-attachments/assets/62b1b139-b26d-4713-a4e0-9520e2b40368)
![4](https://github.com/user-attachments/assets/bba51cf0-d64c-4a56-afd4-15f1342e468a)
![5](https://github.com/user-attachments/assets/352dabf8-2e76-4798-9502-c1522fa48975)
![6](https://github.com/user-attachments/assets/08a82be4-be8c-4314-bf28-b69ec1d82777)
![7](https://github.com/user-attachments/assets/5d46e073-e791-4426-a5d0-732a39734ff9)
![8](https://github.com/user-attachments/assets/2f1a62d7-fc10-487f-a942-728015b5c6de)


## 🚀 Features

- **Modern UI/UX Design**
  - Cyberpunk-inspired aesthetic with dynamic gradients and animations
  - Interactive particle background
  - Custom cursor animations
  - Responsive design for all devices

- **Portfolio Section**
  - Showcase of projects with image sliders
  - Interactive project cards with GitHub links
  - Detailed project descriptions and technologies used

- **Blog System**
  - Dynamic blog posts with categories
  - Rich text content support
  - Code snippet highlighting
  - Responsive image handling

- **Contact System**
  - Form validation with Formik and Yup
  - Email notification system
  - Success/error handling with visual feedback

- **Technical Features**
  - Server-side logging with Winston
  - MongoDB database integration
  - RESTful API architecture
  - JWT authentication
  - Error handling and monitoring

## 🛠️ Tech Stack

### Frontend
- React
- Material-UI
- Framer Motion
- React Router
- Axios
- Formik & Yup

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- Winston Logger

## 🎨 Design Features

- Custom animations using Framer Motion
- Gradient effects and transitions
- Particle system background
- Responsive layout with Material-UI Grid
- Custom styled components

## 🔧 Installation

1. Clone the repository
bash
git clone https://github.com/halit-altun/creative-blog-ui.git

2. Install dependencies for frontend and backend
bash

Frontend
cd frontend
npm install

Backend
cd backend
npm install

3. Create `.env` files in both frontend and backend directories with necessary environment variables

4. Start the development servers
bash

Frontend
npm start

Backend
npm run dev

## 📝 Environment Variables

### Backend (.env)

MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=5000

### Frontend (.env)
VITE_API_URL=http://localhost:5000/api

## API Endpoints

### Blog Routes
GET /api/blogs # Get all blogs
GET /api/blogs/:category # Get blog by category
POST /api/blogs # Create new blog

### Mail Routes
POST /api/mail/send # Send email
GET /api/mail # Get all mail records
GET /api/mail/:id # Get mail by ID


## 📄 License

This project is [MIT](https://github.com/halit-altun/creative-blog-ui/blob/main/LICENSE) licensed.

## 👤 Contact

- Website: [website.com](https://website.com)
- GitHub: [@halit-altun](https://github.com/halit-altun)
- LinkedIn: [halit altun](https://www.linkedin.com/in/halit-altun-923207258/)
