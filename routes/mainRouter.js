const router = require('express').Router();
const { User, Category, Product } = require('../db/models');

router.get('/main', async (req, res) => {
  const products = await Product.findAll({
    include: [{
      model: Category,
    },
    {
      model: User,
    }],
    raw: true,
  });

  products.map((el) => ({
    ...el, owner: (el.user_id === req.session.userId),
  }));
  res.render('main', { products });
});

module.exports = router;
