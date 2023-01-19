const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
    try {
        const categoryData = await Category.findAll({ include: [{ model: Product }] });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    /* req.body should look like this...
    {
      category_name: "Tools",
    }
  */
    try {
        await Category.create(req.body);
        res.status(200).send(`${req.body.category_name} category created successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/", async (req, res) => {
    /* req.body should look like this...
    {
      category_name: "Tools",
    }
  */
    try {
        const oldName = await Category.findByPk(req.params.id).get("category_name");
        await Category.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).send(`${oldName} updated to ${req.body.category_name} successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const oldName = await Category.findByPk(req.params.id).get("category_name");
        await Category.destroy({
            where: { id: req.params.id },
        });
        res.status(200).send(`${oldName} deleted successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
