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

router.post("/:name", async (req, res) => {
    try {
        await Category.create({ category_name: req.params.name });
        res.status(200).send(`${req.params.name} category created successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/:name", async (req, res) => {
    try {
        const oldName = await Category.findByPk(req.params.id).get("category_name");
        await Category.update(
            { category_name: req.params.name },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).send(`${oldName} updated to ${req.params.name} successfully!`);
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
