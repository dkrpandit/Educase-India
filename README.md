# Educase India - Node.js School Management APIs

## Overview

This project is a Node.js assignment focused on developing APIs for managing school data. The primary goal is to implement a set of APIs using the Express.js framework and MySQL to allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Features

- **Add School API**: Allows users to add new schools to the database.
- **List Schools API**: Retrieves a list of schools sorted by proximity to the user's location.

## Requirements

### Database Setup

Create a MySQL table named `schools` with the following fields:

- `id` (Primary Key)
- `name` (VARCHAR)
- `address` (VARCHAR)
- `latitude` (FLOAT)
- `longitude` (FLOAT)

### API Endpoints

1. **Add School API**

   - **Endpoint**: `/addSchool`
   - **Method**: `POST`
   - **Payload**: JSON object containing `name`, `address`, `latitude`, and `longitude`.
   - **Functionality**: Validates the input data and adds a new school to the `schools` table.
   - **Validation**: Ensures all fields are non-empty and of correct data types before insertion.

2. **List Schools API**

   - **Endpoint**: `/listSchools`
   - **Method**: `GET`
   - **Parameters**: User's `latitude` and `longitude`.
   - **Functionality**: Fetches all schools from the database, calculates the geographical distance in km from the user's location, sorts the schools based on proximity, and returns the sorted list.

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dkrpandit/Educase-India.git
   cd Educase-India

### Install Dependencies
```bash
npm install
