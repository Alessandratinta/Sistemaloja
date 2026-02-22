const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();

// =============================
// MIDDLEWARES
// =============================
app.use(express.json());
app.use(cors());

// =============================
// CONFIGURAÇÃO DO POSTGRESQL
// =============================
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Sistemaloja',
  password: '861667',
  port: 5432,
});

// Teste de conexão
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err);
  } else {
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    release();
  }
});

// =============================
// SERVIR FRONTEND
// =============================
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota padrão (quando acessar só localhost:3000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
});
// =============================
// ROTA DE CADASTRO
// =============================
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// =============================
// ROTA DE LOGIN
// =============================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    res.json({
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao conectar com o banco de dados' });
  }
});

// =============================
// INICIAR SERVIDOR
// =============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});