const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    try {
        const tagData = await Tag.findAll({ include: [{ model: Product }] });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    /* req.body should look like this...
    {
      tag_name: "Sports",
    }
  */
    try {
        await Tag.create(req.body);
        res.send(`${req.body.tag_name} created successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    /* req.body should look like this...
    {
      tag_name: "Sports",
    }
  */
    try {
        const oldName = await Tag.findByPk(req.params.id).get("tag_name");
        await Tag.update(req.body, { where: { id: req.params.id } });
        res.send(`${oldName} updated to ${req.body.tag_name} successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const oldName = await Tag.findByPk(req.params.id).get("product_name");
        await Tag.destroy({
            where: { id: req.params.id },
        });
        res.status(200).send(`${oldName} deleted successfully!`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
