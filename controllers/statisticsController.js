const { Information, Subcategory, InformationSubcategory, Category } = require('../models');

exports.Statistics = async (req, res) => {
    const { name } = req.params;
    const industry = await Category.findOne({
        where: {
            name: name
        }
    });
    if (!industry) {
        return res.status(404).json({ message: 'Industry not found' });
    };

    const industry_id = industry.id;

    const Subcategorys = await Subcategory.findAll({
        where: {
            categoryId: industry_id
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