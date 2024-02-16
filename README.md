<div align="center">
  <img width=158 src="./client/public/logo_text_dark.png#gh-dark-mode-only">
  <img width=158 src="./client/public/logo_text_light.png#gh-light-mode-only">
</div>

# Productify
We are a project management plataform focus in making your team more productive when working together. Create custome task boards to track your progress and comunicate with your team at any time.

## What's in Producify:
 - Create projects that will help you **organize your work**.
 - Manage **members and permission** to improve safety.
 - Create **custom boards** or use the default **templates** to organize your tasks.
 - User friendly UI.
 - Create group chats between your members to comunicate in real time.


## What we built:

### UI
 - Implemented a variety of React design patterns for the development of this application (e.g. Compound components, render props, And   more). With a combination of some Shadcn/ui components.
 - Dark/Light/System mode to suit all tastes.
 - Modern and responsive design using **Tailwind CSS**.
   
### Security
 - Signin with **OAuth2.0** using Github and Google for a safer process.
 - Signin using a **hashed safe code** (sent to the email) or create a **permanent password**.
 - Session and user authentication using **JWT** (Json Web Token) stored in the browser cookies.
 - Token expiration after a certain amount of time and also if account no longer exists.
 - All data is sanitize to prevent **XSS**, **NoSQL injections**.
 - Roles & permission for endpoints.
 - Routes protection in both server and client side.

### Data Storage
 - All tasks, chats and users data is securely store in our **MongoDB** database (atlas cloud service). (Hosted in South America).
 - Endpoint schema validation using **JOI**.
 - Data models with mongoose that include type check and validation to ensure that data is correct.
 - Profile images are optimize before being uploaded to our cloud bucket.
 - The images are store in the **Google cloud storage** service. (Hosted in South America).
 
### Chats
 - Implemented Web Sockets for **real time messaging**.
 - Emoji picker for a funnier experience.
 - Private group chats, only accessible by the members.


## Technologies
#### Front-End
![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white)
![React Forms](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

#### Back-End
![Node JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

#### Hosted
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)















