create table users
(
    id         varchar(24) not null primary key,
    phone      varchar(12) not null,
    otp        varchar(5)  null,
    first_name varchar(24) null,
    last_name  varchar(24) null,
    email      varchar(64) null,
    role       smallint    not null     default 1,
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now()
);

create table category
(
    id         varchar(24) not null primary key,
    name_uz    varchar(64) not null,
    name_ru    varchar(64) not null,
    image_original      text        null,
    image_small      text        null,
    parent_id  varchar(24),
    constraint fk_parent_category foreign key (parent_id) references category (id),
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now()
);

create table shop
(
    id             varchar(24) not null primary key,
    name           varchar(64) not null,
    description    text,
    avif_image      text        null,
    small_image      text        null,
    login           varchar(24) not null,
    password        text        not null,
    status         smallint     not null default 1,
    is_deleted     bool        not null     default false,
    created_at     timestamp with time zone default now()
);

create table products
(
    id             varchar(24) not null primary key,
    name_uz        varchar(64) not null,
    name_ru        varchar(64) not null,
    image          text        null,
    category_id    varchar(24),
    constraint fk_category foreign key (category_id) references category (id),
    price          integer       not null,
    discount_price     integer,
    count          smallint    not null,
    shop_id       varchar(24),
    constraint fk_owner foreign key (owner_id) references shop (id),
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
    id         varchar(24) not null primary key,
    product_id    varchar(64) not null,
    count   smallint not null default 1,
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now(),
    client_data jsonb not null,
    price integer not null,
    seller_id varchar(24) not null,
    status smallint not null default 0
);

create table advertisements
(
    id         varchar(24) not null primary key,
    title      varchar(255),
    image          text        null,
    link          text        null,
    is_deleted bool        not null     default false,
    created_at timestamp with time zone default now(),
);
