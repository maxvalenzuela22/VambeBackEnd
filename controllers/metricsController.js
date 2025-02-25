const { Op } = require("sequelize");
const { Information, Subcategory, InformationSubcategory, Category } = require("../models");

exports.getMetrics = async (req, res) => {
    try {
        const { startDate, endDate, seller, closed, category, subcategory } = req.query;

        const filters = {};

        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date[Op.gte] = new Date(startDate);
            if (endDate) filters.date[Op.lte] = new Date(endDate);
        }

        if (seller) {
            filters.seller = { [Op.iLike]: `%${seller}%` };
        }

        if (closed) {
            filters.closed = closed;
        }

        const generalInformation = await Information.findAll({
            where: filters,
            include: [
                {
                    model: Subcategory,
                    as: "subcategories",
                    through: { attributes: [] },
                    include: [
                        {
                            model: Category,
                            as: "category",
                            where: category ? { name: { [Op.iLike]: `%${category}%` } } : undefined, 
                        }
                    ],
                    where: subcategory ? { name: { [Op.iLike]: `%${subcategory}%` } } : undefined,
                }
            ]
        });

        res.json({ success: true, data: generalInformation });
    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ success: false, message: "Error fetching metrics" });
    }
};

exports.getSubcategories = async (req, res) => {
    const { categoryName } = req.query;
    console.log("categoryName", categoryName);
    try {
        const category = await Category.findOne({
            where: { name: categoryName },
        });

        const subcategories = await Subcategory.findAll({
            where: { categoryId: category.id },
        });

        res.json({ success: true, data: subcategories });
    }
    catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ success: false, message: "Error fetching subcategories" });
    }
}
