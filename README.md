# 🛒 Ecommerce Backend Application Using NestJS and TypeScript
Welcome to the repository of my ecommerce backend application built with the powerful NestJS framework and TypeScript. This application is designed to handle complex ecommerce operations including user authentication, product management, order processing, and image handling.

## Features ✨
 - **Authentication Service**: Implements secure user registration with encrypted password storage in a PostgreSQL database using TypeORM. Supports login with password encryption comparison and issues JWTs that differentiate between admin and user roles to manage access to specific routes.
 - **Product Management**: Allows administrators to add, edit, or remove products from the inventory. Each product can have images associated, which are managed through integration with Cloudinary.
 - **Order Management**: Facilitates the creation, viewing, and management of customer orders, with details on each transaction.
 - **User Management**: Enables administrators to edit or delete user profiles, enhancing control over user access and data.
 - **Image Upload Service**: Integrated with Cloudinary to upload and link product images directly within the product entities in the database.
 - **Swagger Documentation**: Fully documented API with Swagger to facilitate endpoint testing and interaction.
 - **Docker Support**: Includes Docker configurations for deploying both the application and the database as containers, ensuring a scalable and isolated environment.

## Technologies Used 🔧
 - Framework: NestJS
 - Programming Language: TypeScript
 - Database: PostgreSQL
 - ORM: TypeORM
 - Authentication: JWT
 - Image Storage: Cloudinary
 - Documentation: Swagger
 - Containerization: Docker

## Prerequisites 🚀
Ensure Node.js is installed on your system.
Docker should be installed if you intend to use containerization.
A Cloudinary account for handling image uploads.

## API Documentation
Access the Swagger UI by navigating to [http://localhost:3000/api](http://localhost:3000/api/doc/ecommerce#/) to test and explore the API endpoints.

## Contact Information:
Email: saidsimon2@gmail.com
LinkedIn: www.linkedin.com/in/ing-fullstack-said-aljure-8a0b07179
