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