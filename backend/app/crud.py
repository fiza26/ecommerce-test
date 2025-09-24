from sqlalchemy.orm import Session
from . import models, schemas

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def create_order(db: Session, order: schemas.OrderCreate):
    total_cents = 0
    db_order = models.Order(
        customer_name=order.customer_name,
        customer_email=order.customer_email,
        total_cents=0  
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            continue  # skip invalid product
        item_total = product.price_cents * item.quantity
        total_cents += item_total
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=product.id,
            quantity=item.quantity,
            price_cents=product.price_cents
        )
        db.add(db_item)

    db_order.total_cents = total_cents
    db.commit()
    db.refresh(db_order)
    return db_order


def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Order).offset(skip).limit(limit).all()


def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()
