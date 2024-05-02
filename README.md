# Assignment Management System for Baba Institute of Technology and Science, Vishakhapatnam
## Overview
This project is an Assignment Management System designed for academic institutions, specifically tailored for Baba Institute of Technology and Science in Vishakhapatnam. The system consists of three portals: Admin, Faculty, and Student, each with distinct functionalities to manage assignments efficiently.

Technologies Used
Frontend: React, HTML, CSS, JavaScript, Redux (with Redux Persist for state persistence)
Database: Firebase Realtime Database
Authentication: Firebase Authentication
Hosting Platform: Netlify
IDE: Visual Studio Code
Features by Portal
1. ### Admin Portal
Admin Signup: Admins can register using their email, name, password, and stream (branch). Information is saved in Firebase Realtime Database.
Faculty Signup: Admins can register faculty members with email, password, and name, assigning them to specific branches.
Student Signup: Admins can register students for each semester and branch.
Promote Students: Admins can promote students to the next semester based on exam results.
Add Subjects: Admins can add subjects to respective branches.
Map Subjects: Admins can assign faculty to teach specific subjects across different semesters.

__Admin Signup__
![Admin Signup](screenshots/admin/admin%20signup.png)

2. ### Faculty Portal
Subject Management: Faculty can view and manage subjects assigned to them.
Create Assignment: Faculty can create assignments by providing submission dates, titles, and descriptions.
Check Assignments: Faculty can view active and inactive assignments, evaluate submissions, and provide feedback and marks.
Student List: Faculty can view a list of students in their branch and their assignment submissions.
3. ### Student Portal
Subject View: Students can view subjects assigned to them for the current semester.
Assignment Submission: Students can submit assignments for active subjects, view feedback and marks for inactive assignments.
View Assignments: Students can view details of assignments, including submission status and faculty feedback.
Database Structure
The Firebase Realtime Database is structured to store:

Admin, faculty, and student information.
Branch-wise subjects and faculty assignments.
Assignment details, including submissions and evaluations.
Deployment and State Management
The project is deployed on Netlify for hosting. Redux with Redux Persist is utilized for state management, ensuring that user sessions and data persist across page reloads.

Git Repository
The Git repository for this project contains the source code, detailed documentation, and setup instructions for better understanding and replication of the system.