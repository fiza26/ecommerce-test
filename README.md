<img width="1919" height="884" alt="ecommerce project test 1" src="https://github.com/user-attachments/assets/006624a5-4270-4477-979c-4d2adb86e4bc" />
<img width="1919" height="886" alt="ecommerce project test 2" src="https://github.com/user-attachments/assets/a174a23a-54bc-4ddf-9e99-2d2c810ded76" />
<img width="1896" height="887" alt="ecommerce project test 3" src="https://github.com/user-attachments/assets/7ed17c8a-133f-4aaa-affc-1deb356f35e1" />
<img width="1899" height="889" alt="ecommerce project test 4" src="https://github.com/user-attachments/assets/a266f013-c038-4a33-9e00-afa2be0f55e6" />
<img width="1897" height="888" alt="ecommerce project test 5" src="https://github.com/user-attachments/assets/b2aa80f8-e550-4f2c-83da-04a5a9bdb8b2" />

E-commerce Backend (FastAPI + MySQL)

1. MySQL Setup
-- Create database
CREATE DATABASE ecommerce;

-- Create user
CREATE USER 'ecomuser'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecomuser'@'localhost';
FLUSH PRIVILEGES;

2. Database Tables
Products Table

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INT NOT NULL,
    image_url VARCHAR(1024)
);

Orders Table

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    total_cents INT NOT NULL DEFAULT 0
);


Order Items Table

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_cents INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


Sample Data

-- Products
INSERT INTO products (name, description, price_cents, image_url) VALUES
('Red Hoodie', 'Warm and stylish hoodie for winter', 3999, 'https://picsum.photos/500/301'),
('Blue T-Shirt', 'Comfortable cotton t-shirt', 1999, 'https://picsum.photos/500/300'),
('Black Jeans', 'Classic slim fit jeans', 4999, 'https://picsum.photos/500/302');


4. Environment Variables

Create a .env file in the backend folder:

DATABASE_URL=mysql+pymysql://ecomuser:yourpassword@localhost:3306/ecommerce

Replace yourpassword with your MySQL password.


5. Python Backend Setup
5.1. Create Virtual Environment

cd backend
python -m venv venv


5.2. Activate Virtual Environment

Windows (PowerShell):

source venv/Scripts/activate

5.3. Install Dependencies

pip install fastapi uvicorn sqlalchemy pymysql python-dotenv


6. Run Backend Server

python -m uvicorn backend.app.main:app --reload

API Root: http://127.0.0.1:8000/
Swagger Docs: http://127.0.0.1:8000/docs

7. Folder Structure

backend/
├─ app/
│  ├─ main.py          # FastAPI app
│  ├─ models.py        # SQLAlchemy models (Product, Order, OrderItem)
│  ├─ schemas.py       # Pydantic schemas
│  ├─ crud.py          # Database functions
│  └─ database.py      # Database connection
├─ venv/               # Python virtual environment
└─ .env


8. API Endpoints

Method	Endpoint	Description
GET	/products	List all products
POST	/products	Create a new product
GET	/orders	List all orders
GET	/orders/{order_id}	Get single order
POST	/orders	Create a new order
