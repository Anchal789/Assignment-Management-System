# Assignment Management System for Baba Institute of Technology and Science, Vishakhapatnam
## Overview
This project is an Assignment Management System designed for academic institutions, specifically tailored for Baba Institute of Technology and Science in Vishakhapatnam. The system consists of three portals: Admin, Faculty, and Student, each with distinct functionalities to manage assignments efficiently.

## Technologies Used
- __Frontend__ : _React, HTML, CSS, JavaScript, Redux (with Redux Persist for state persistence)_
- __Database__ : _Firebase Realtime Database_
- __Authentication__ : _Firebase Authentication_
- __Hosting Platform__ : _Netlify_
- __IDE__ : _Visual Studio Code_

## Features by Portal


1. ### Admin Portal
- __Admin Signup__ : Admins can register using their email, name, password, and stream (branch). Information is saved in Firebase Realtime Database.

- __Faculty Signup__ : Admins can register faculty members with email, password, and name, assigning them to specific branches.

- __Student Signup__ : Admins can register students for each semester and branch.

- __Promote Students__ : Admins can promote students to the next semester based on exam results.

- __Add Subjects__ : Admins can add subjects to respective branches.

- __Map Subjects__ : Admins can assign faculty to teach specific subjects across different semesters.

2. ### Faculty Portal
- __Subject Management__ : Faculty can view and manage subjects assigned to them.
- __Create Assignment__ : Faculty can create assignments by providing submission dates, titles, and descriptions.
- __Check Assignments__ : Faculty can view active and inactive assignments, evaluate submissions, and provide feedback and marks.
- __Student List__ : Faculty can view a list of students in their branch and their assignment submissions.

3. ### Student Portal
- __Subject View__: Students can view subjects assigned to them for the current semester.
- __Assignment Submission__: Students can submit assignments for active subjects, view feedback and marks for inactive assignments.
- __View Assignments__ : Students can view details of assignments, including submission status and faculty feedback.
## Database Structure
The Firebase Realtime Database is structured to store:

- Admin, faculty, and student information.
- Branch-wise subjects and faculty assignments.
- Assignment details, including submissions and evaluations.
## Deployment and State Management
The project is deployed on Netlify for hosting. Redux with Redux Persist is utilized for state management, ensuring that user sessions and data persist across page reloads.

## Git Repository
The Git repository for this project contains the source code, detailed documentation, and setup instructions for better understanding and replication of the system.

## ScreenShots
__Main Page__
![Admin Signup](screenshots/admin/main%20page.png)

### Admin Portal 
__Admin Signup__
![Admin Signup](screenshots/admin/admin%20signup.png)
__Admin Login__
![Admin Login](screenshots/admin/admin%20login.png)
__Admin Home__
![Admin Home](screenshots/admin/admin%20home.png)
__Faculty SignUp__
![Faculty Signup](screenshots/admin/faculty%20signup.png)
__Student Signup__
![Student Signup](screenshots/admin/student%20signup.png)
__Promote Students__
![Promote Student](screenshots/admin/promote%20students.png)
__Add Subjects__
![Add Subjects](screenshots/admin/add%20subjects.png)
__Map Subjects__
![Map Subjects](screenshots/admin/map%20subjects.png)
__Promote Students__
![Promote Students](screenshots/admin/promote%20students.png)

### Faculty Portal 

__Faculty Login__
![Faculty Login](screenshots/faculty/faculty%20login.png)
__Faculty Subjects Choosing__
![Faculty Subjects Choosing](screenshots/faculty/faculty%20subjects.png)
__Faculty Home__
![Faculty Home](screenshots/faculty/faculty%20home.png)
__Create Assignment__
![Create Assignment](screenshots/faculty/create%20assignmentss.png)
__Check Assignment__
![Check Assignment](screenshots/faculty/check%20assignments.png)
__Evaluation__
![Evaluation](screenshots/faculty/evaluation.png)
__Close Assignment__
![Close Assignment](screenshots/faculty/close%20assignments.png)
__Student List__
![Student List](screenshots/faculty/student%20list.png)

### Student Portal

__Student Login__
![Student Login](./screenshots/student/student%20login.png)
__Student Subjects__
![Student Subjects](./screenshots/student/student%20subject.png)
__Active Assignments__
![Active Assignments](./screenshots/student/active.png)
__Inactive Assignments__
![Inactive Assignments](./screenshots/student/inactive.png)
__Submit Assignments__
![Submit Assignments](./screenshots/student/submit%20assignment.png)
__Review Assignment__
![Review Assignment](./screenshots/student/review%20assignment.png)