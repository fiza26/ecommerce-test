from pydantic import BaseModel
from typing import List

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price_cents: int
    image_url: str | None = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    price_cents: int

    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: str

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    total_cents: int
    items: List[OrderItem]

    class Config:
        orm_mode = True
