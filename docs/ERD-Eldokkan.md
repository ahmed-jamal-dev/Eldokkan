erDiagram
    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar password
        varchar role
        timestamp created_at
    }

    CATEGORIES {
        uuid id PK
        varchar name
        text description
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK
        varchar name
        text description
        numeric price
        int stock
        uuid category_id FK
        timestamp created_at
    }

    CARTS {
        uuid id PK
        uuid user_id FK
        timestamp created_at
    }

    CART_ITEMS {
        uuid id PK
        uuid cart_id FK
        uuid product_id FK
        int quantity
        timestamp created_at
    }

    ORDERS {
        uuid id PK
        uuid user_id FK
        varchar status
        numeric total_price
        timestamp created_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        numeric price
        timestamp created_at
    }

    PAYMENTS {
        uuid id PK
        uuid order_id FK
        varchar method
        varchar status
        timestamp paid_at
        timestamp created_at
    }

    USERS ||--o{ CARTS : "owns"
    USERS ||--o{ ORDERS : "makes"
    CATEGORIES ||--o{ PRODUCTS : "has"
    CARTS ||--o{ CART_ITEMS : "includes"
    PRODUCTS ||--o{ CART_ITEMS : "in"
    ORDERS ||--o{ ORDER_ITEMS : "contains"
    PRODUCTS ||--o{ ORDER_ITEMS : "in"
    ORDERS ||--o{ PAYMENTS : "paid with"
