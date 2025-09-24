<img width="1919" height="884" alt="ecommerce project test 1" src="https://github.com/user-attachments/assets/006624a5-4270-4477-979c-4d2adb86e4bc" />
<img width="1919" height="886" alt="ecommerce project test 2" src="https://github.com/user-attachments/assets/a174a23a-54bc-4ddf-9e99-2d2c810ded76" />
<img width="1896" height="887" alt="ecommerce project test 3" src="https://github.com/user-attachments/assets/7ed17c8a-133f-4aaa-affc-1deb356f35e1" />
<img width="1899" height="889" alt="ecommerce project test 4" src="https://github.com/user-attachments/assets/a266f013-c038-4a33-9e00-afa2be0f55e6" />
<img width="1897" height="888" alt="ecommerce project test 5" src="https://github.com/user-attachments/assets/b2aa80f8-e550-4f2c-83da-04a5a9bdb8b2" />

E-commerce Backend (FastAPI + MySQL)

-----

# E-commerce Backend API

This project is a robust e-commerce backend API built with **FastAPI** and **MySQL**. It handles product management and order processing, providing a solid foundation for any e-commerce application.

-----

## 🚀 Getting Started

Follow these steps to set up and run the backend server.

### 1\. Database Setup

First, you'll need to set up your MySQL database.

**Create the database and user:**

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS ecommerce;

-- Create a user and grant permissions
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;
```

Replace `your_secure_password` with a strong password.

**Create the tables:**

Connect to the `ecommerce` database and run the following SQL scripts to create the necessary tables.

```sql
-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INT NOT NULL,
    image_url VARCHAR(1024)
);

-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_cents INT NOT NULL DEFAULT 0
);

-- Order Items Table (Junction Table)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_cents INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

**Add sample data (optional):**

You can insert some sample products to test the API.

```sql
INSERT INTO products (name, description, price_cents, image_url) VALUES
('Red Hoodie', 'Warm and stylish hoodie for winter', 3999, 'https://picsum.photos/500/301'),
('Blue T-Shirt', 'Comfortable cotton t-shirt', 1999, 'https://picsum.photos/500/300'),
('Black Jeans', 'Classic slim fit jeans', 4999, 'https://picsum.photos/500/302');
```

-----

### 2\. Python Backend Setup

Navigate to the `backend` directory to set up the Python environment.

**Create and activate a virtual environment:**

```bash
# Navigate to the backend directory
cd backend

# Create the virtual environment
python -m venv venv

# Activate the virtual environment (Windows PowerShell)
./venv/Scripts/activate
```

**Install dependencies:**

Install all the required packages using pip.

```bash
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv
```

-----

### 3\. Configuration

Create a `.env` file in the `backend` folder to store your database credentials securely.

```bash
# .env file
DATABASE_URL=mysql+pymysql://ecomuser:your_secure_password@localhost:3306/ecommerce
```

Make sure to replace `your_secure_password` with the password you set in the MySQL setup.

-----

### 4\. Running the Server

Start the FastAPI server. The `--reload` flag allows the server to automatically restart when code changes are detected, which is great for development.

```bash
python -m uvicorn app.main:app --reload
```

You can now access the application at:

  - **API Root:** `http://127.0.0.1:8000/`
  - **Swagger Docs:** `http://127.0.0.1:8000/docs`

The **Swagger Docs** provide a complete, interactive list of all API endpoints.

-----

## 📁 Project Structure

This is the recommended folder structure for the project:

```
backend/
├─ app/
│  ├─ main.py            # Main FastAPI application
│  ├─ models.py          # SQLAlchemy ORM models (Product, Order, OrderItem)
│  ├─ schemas.py         # Pydantic schemas for data validation
│  ├─ crud.py            # CRUD (Create, Read, Update, Delete) database functions
│  └─ database.py        # Database connection and session management
├─ venv/                 # Python virtual environment
└─ .env                  # Environment variables
```

-----

## 🔗 API Endpoints

Here's a quick overview of the main API endpoints:

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| `GET`  | `/products`          | Lists all products         |
| `POST` | `/products`          | Creates a new product      |
| `GET`  | `/orders`            | Lists all orders           |
| `GET`  | `/orders/{order_id}` | Retrieves a single order   |
| `POST` | `/orders`            | Creates a new order        |
