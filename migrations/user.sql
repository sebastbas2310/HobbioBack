-- Crea la tabla users
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name VARCHAR NOT NULL,
  user_status VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  things_like VARCHAR NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Opcional: Para validar el formato de email y longitud de teléfono, puedes usar constraints:
ALTER TABLE users
  ADD CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT phone_length CHECK (char_length(phone_number) >= 10 AND char_length(phone_number) <= 15);