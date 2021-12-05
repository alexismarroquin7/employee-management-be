const bcrypt = require('bcryptjs');

const rounds = process.env.DB_ROUNDS 
? Number(process.env.DB_ROUNDS) 
: 8;

const userPassword = process.env.TEST_USER_PASSWORD || '1234';
const hash = bcrypt.hashSync(userPassword, rounds);

const users = [
  {
    // 1
    email: 'pabloEscobar@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 2
    email: 'javierPena@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 3
    email: 'tataEscobar@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 4
    email: 'steveMurphy@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 5
    email: 'mariaSalazar@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 6
    email: 'helmerHerrera@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 1
  },
  {
    // 7
    email: 'amadoCarillo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 8
    email: 'valeriaVelez@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 9
    email: 'elisaAlvarez@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 10
    email: 'gustavoGaviria@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 11
    email: 'marinaOchoa@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 12
    email: 'horacioCarrillo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 13
    email: 'cristinaJurado@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 14
    email: 'jorgeSalcedo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 15
    email: 'paolaSalcedo@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 16
    email: 'davidRodriguez@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 17
    email: 'billStechner@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 18
    email: 'dianaTurbay@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 19
    email: 'chuchoPena@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 20
    email: 'cesarGaviria@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 21
    email: 'fabioOchoa@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 22
    email: 'rachelGreen@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 23
    email: 'chandlerBing@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 24
    email: 'monicaGeller@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 25
    email: 'joeyTribbiani@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
  {
    // 26
    email: 'rossGeller@gmail.com',
    email_confirmed: 1,
    password: hash,
    role_id: 2
  },
]

module.exports = users;