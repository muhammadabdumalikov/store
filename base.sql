create table users
(
    id         varchar(24) not null primary key,
    phone      varchar(12) not null,
    otp        varchar(5)  null,
    first_name varchar(24) null,
    last_name  varchar(24) null,
    role       smallint    not null     default 1,
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now()
);

create table category
(
    id         varchar(24) not null primary key,
    name_uz    varchar(64) not null,
    name_lat   varchar(64) not null,
    name_ru    varchar(64) not null,
    image      text        null,
    parent_id  varchar(24),
    constraint fk_parent_category foreign key (parent_id) references category (id),
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now()
);

create table products
(
    id             varchar(24) not null primary key,
    name_uz        varchar(64) not null,
    name_lat       varchar(64) not null,
    name_ru        varchar(64) not null,
    image          text        null,
    category_id    varchar(24),
    constraint fk_category foreign key (category_id) references category (id),
    price          money       not null,
    sale_price     money,
    count          smallint    not null,
    owner_id       varchar(24),
    constraint fk_owner foreign key (owner_id) references users (id),
    characteristic jsonb,
    description    text,
    is_deleted     bool        not null     default false,
    created_at     timestamp with time zone default now()
);

alter table category
add column last_child bool default false;

alter table products
add column status smallint not null default 0;

create table orders
(
    id            varchar(24) not null primary key,
    product_id    varchar(24) not null,
    constraint fk_product foreign key (product_id) references products (id),
    count         smallint not null default 1,
    client_data   jsonb not null,
    price         money       not null,
    seller_id     varchar(24) not null,
    constraint fk_seller foreign key (seller_id) references users (id),
    status        smallint    not null default 0,
    is_deleted    bool        not null     default false,
    created_at    timestamp with time zone default now()
)

SELECT    json_build_object('name', c0.name_uz, 'id', c0.id)  AS first,
json_build_object('name', c1.name_uz, 'id', c1.id)  AS second,
json_build_object('name', c2.name_uz, 'id', c2.id)  AS third
FROM      category c0
LEFT JOIN category c1 ON c1.parent_id = c0.id
LEFT JOIN category c2 ON c2.parent_id = c1.id
WHERE     c0.parent_id IS NULL
ORDER BY  c0.id, c1.id, c2.id;
