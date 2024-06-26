
# **ChiPay Application Overview**

This web application allows users to create and manage their accounts, send and receive payments, and view transaction history. Built with Next.js, TypeScript, Zod for form validation, Tailwind, and Shadcn UI, the app utilizes AppWrite for backend services and authentication. It integrates Chimoney's API for seamless payment functionalities. Key features include:

- **User Authentication**: Secure sign-up, login, and logout functionality.

- **Dashboard**: User dashboard displaying wallet balances, recent transactions, and payment actions.

- **Send Payment**: Users can send payments with the recipient's account ID, email, or phone number.

- **Receive Payment**: Users can initiate a payment request, which is reflected in their account balance and transaction history.

- **Transaction History**: A detailed view of transaction history with dates, types, amounts, and recipient/sender information.

- **Security Measures**: Client-side encryption of sensitive data.

# Live Application

The application is live and can be accessed at [https://chipay-three.vercel.app/](https://chipay-three.vercel.app/)

# Approach

My approach to building this application involved the following steps:

- **Understanding the Flow**: I started by thoroughly understanding the requirements and planning the overall architecture of the application.
- **Piece-by-Piece Development**: I broke down the development process into manageable pieces:
	- Set up the frontend with Next.js, TypeScript, Tailwind, and ShadCN UI.
	- Implemented user authentication using AppWrite.
	- Created necessary user documents and attributes on AppWrite.
	- Integrated Chimoney's API for payment functionalities.
	- Developed the dashboard and transaction history components.
	- Secured private routes and encrypted sensitive data on the client side.

- **Integration**: After developing individual components, I integrated them to ensure seamless functionality across the application.

This structured approach allowed me to build a robust and well-functioning application.

# Challenges

The primary challenge I encountered during the development process was my tendency towards perfectionism. Striving for perfect implementation and design sometimes slowed down the progress. However, I managed to overcome this by focusing on delivering a functional and secure application.

# CI/CD with Vercel

The application is hosted on Vercel, which provides a seamless CI/CD process. Once the code is pushed to the repository, Vercel automatically triggers a build and deployment process, ensuring smooth and efficient updates.

# CI/CD Setup

- **Connect Repository**: The GitHub repository is connected to Vercel.
- **Automatic Deployments**: Every push to the main branch triggers an automatic deployment.
- **Preview Deployments**: For every pull request, Vercel creates a unique preview URL for testing and validation.

# Deployment Steps

- **Push Code**: Push changes to the GitHub repository.
- **Automatic Build**: Vercel detects the changes and starts the build process.
- **Deployment**: After a successful build, the application is deployed, and a deployment link is generated automatically.

# Local Installation

Firstly, clone the repository, install the dependencies, and then run the development server:

```bash
git clone https://github.com/Olalexy1/chipay.git
cd chipay
```

```bash
npm install
# or
yarn dev
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_SITE_URL`

`NEXT_PUBLIC_APPWRITE_ENDPOINT`

`NEXT_PUBLIC_APPWRITE_PROJECT`

`APPWRITE_DATABASE_ID`

`APPWRITE_USER_COLLECTION_ID`

`NEXT_APPWRITE_KEY`

`CHIMONEY_API_KEY`

`CHIMONEY_API_URL`

## Screenshots

![ScreenShot](/public/images/chipayImg1.png)

![ScreenShot](/public/images/chipayImg2.png)

![ScreenShot](/public/images/chipayImg3.png)

![ScreenShot](/public/images/chipayImg4.png)

![ScreenShot](/public/images/chipayImg5.png)

![ScreenShot](/public/images/chipayImg6.png)
