const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const getCategory = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(getCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!getCategory) {
      res.status(404).json({ message: 'No Category found with that ID. Try a different ID.' });
      return
    }
    res.json(getCategory);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const postCategory = await Category.create(req.body)
    res.json(postCategory)
  } catch (error) {
    res.json(error);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No Category found with that id. Try a different ID' });
      return
    }
    res.json(updateCategory);
  } catch (error) {
    res.json(error);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with that id. Try a different ID' });
      return
    }
    res.json(deleteCategory);
  } catch (error) {
    res.json(error);
  }

});

module.exports = router;
