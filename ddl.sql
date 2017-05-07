CREATE TABLE IF NOT EXISTS apples
(
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (id)
);

-- INSERT INTO apples (name) VALUES ('Golden Russet');
