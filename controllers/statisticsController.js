const { Information, Subcategory, InformationSubcategory, Category } = require('../models');

exports.getStatistics = async (req, res) => {
    const { name } = req.params;
    const category = await Category.findOne({
        where: {
            name: name
        }
    });
    if (!category) {
        return res.status(404).json({ message: 'category not found' });
    };

    const category_id = category.id;

    const Subcategorys = await Subcategory.findAll({
        where: {
            categoryId: category_id
        }
    });

    const Statistics = [];

    for (const subcategory of Subcategorys) {
        const subcategory_id = subcategory.id;

        const informationSubcategories = await InformationSubcategory.findAll({
            where: {
                subcategoryId: subcategory_id
            }
        });

        Statistics.push({
            subcategory: subcategory.name,
            count: informationSubcategories.length
        });
    }
    res.status(200).json(Statistics);
};

const getSubcategoriesWithDeals = async (req, res, dealType) => {
    try {
        const { name } = req.params;
        const category = await Category.findOne({ where: { name } });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subcategories = await Subcategory.findAll({ where: { categoryId: category.id } });

        let max = 0;
        let bestSubcategory = null;

        await Promise.all(subcategories.map(async (subcategory) => {
            const informationSubcategories = await InformationSubcategory.findAll({
                where: { subcategoryId: subcategory.id }
            });

            const count = (await Promise.all(informationSubcategories.map(async (infoSub) => {
                const info = await Information.findOne({ where: { id: infoSub.informationId } });
                return dealType === 'closed' ? info.closed : (info.closed === 0 ? 1 : 0);
            }))).reduce((sum, value) => sum + value, 0);

            if (count > max) {
                max = count;
                bestSubcategory = subcategory;
            }
        }));

        res.status(200).json({ subcategory: bestSubcategory, amount: max });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getSubcategoriesWithMostClosedDeals = async (req, res) => {
    return getSubcategoriesWithDeals(req, res, 'closed');
};

exports.getSubcategoriesWithMostFailedDeals = async (req, res) => {
    return getSubcategoriesWithDeals(req, res, 'failed');
};
