const { Op } = require("sequelize");
const { Information, Subcategory, InformationSubcategory, Category } = require("../models");

exports.getMetrics = async (req, res) => {
    try {
        const { startDate, endDate, client, seller, closed, category, subcategory } = req.query;

        const filters = {};

        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date[Op.gte] = new Date(startDate);
            if (endDate) filters.date[Op.lte] = new Date(endDate);
        }

        if (client) {
            filters.client = { [Op.iLike]: `%${client}%` };
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

exports.getInfoById = async (req, res) => {
    const { id } = req.params;
    try {
        const information = await Information.findByPk(id, {
            include: [
                {
                    model: Subcategory,
                    as: "subcategories",
                    through: { attributes: [] },
                    include: [
                        {
                            model: Category,
                            as: "category",
                        }
                    ]
                }
            ]
        });

        if (!information) {
            return res.status(404).json({ success: false, message: "Information not found" });
        }

        res.json({ success: true, data: information });
    }
    catch (error) {
        console.error("Error fetching information:", error);
        res.status(500).json({ success: false, message: "Error fetching information" });
    }
}

exports.getSellers = async (req, res) => {
    try {
        const sellers = await Information.findAll({
            attributes: ["seller"],
            group: ["seller"],
        });

        res.json({ success: true, data: sellers });
    }
    catch (error) {
        console.error("Error fetching sellers:", error);
        res.status(500).json({ success: false, message: "Error fetching sellers" });
    }
}