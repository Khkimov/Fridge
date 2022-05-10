const router = require('express').Router();
const bcrypt = require('bcrypt'); // хеширует пароли
const { User } = require('../db/models'); // забираем юзера из модели
const checkAuth = require('../middleware/checkAuth');
const checkLogin = require('../middleware/checkLogin');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/registration', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 5);
  try {
    const candidate = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (candidate) {
      res.render('index', { message: 'Такой пользователь уже существует. Переходите по кнопке ВОЙТИ' });
    } else {
      await User.create({ name, email, password: hash });
      res.redirect('/main');
    }
  } catch (error) {
    res.status(500);
  }
});

router.post('/signin', checkLogin, async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (passwordMatch) {
      req.session.email = user.email; // запихиваем в сессию
      res.redirect('/main');
    } else {
      res.render('index', { message: 'Вам нужно зарегистрироваться' });
    }
  } catch (error) {
    res.send('Cannot find User!');
  }
});

module.exports = router;
