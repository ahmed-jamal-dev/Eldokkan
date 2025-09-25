erDiagram
    USERS {
        string id PK
        varchar name
        varchar email UK
        varchar password
        varchar role
        timestamp created_at
    }

    CATEGORIES {
        string id PK
        varchar name
        text description
        timestamp created_at
    }

    PRODUCTS {
        string id PK
        varchar name
        text description
        numeric price
        int stock
        string category_id FK
        timestamp created_at
    }

    CARTS {
        string id PK
        string user_id FK
        timestamp created_at
    }

    CART_ITEMS {
        string id PK
        string cart_id FK
        string product_id FK
        int quantity
        timestamp created_at
    }

    ORDERS {
        string id PK
        string user_id FK
        varchar status
        numeric total_price
        timestamp created_at
    }

    ORDER_ITEMS {
        string id PK
        string order_id FK
        string product_id FK
        int quantity
        numeric price
        timestamp created_at
    }

    USERS ||--o{ CARTS : "owns"}
    USERS ||--o{ ORDERS : "makes"}
    CATEGORIES||--o{ PRODUCTS : "has"}
    CARTS ||--o{ CART_ITEMS : "includes"}
    PRODUCTS ||--o{ CART_ITEMS : "in"}
    ORDERS ||--o{ ORDER_ITEMS : "contains"}
    PRODUCTS ||--o{ ORDER_ITEMS : "in"}
    ORDERS ||--o{ PAYMENTS : "paid with"}
