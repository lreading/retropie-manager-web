CREATE TABLE RetroPie (
    id serial PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    private_key VARCHAR(350)
);
