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
    console.log(Statistics);
    res.status(200).json(Statistics);
};

exports.getSubcategoriesWithMostClosedDeals = async (req, res) => {
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

    let max = 0;
    let subcategoryWithMostClosedDeals = null;
    for (const subcategory of Subcategorys) {
        const subcategory_id = subcategory.id;

        const informationSubcategories = await InformationSubcategory.findAll({
            where: {
                subcategoryId: subcategory_id
            }
        });

        let count = 0;
        for (const informationSubcategory of informationSubcategories) {
            const information_id = informationSubcategory.informationId;
            const information = await Information.findOne({
                where: {
                    id: information_id
                }
            });
            count += information.closed;
        }

        if (count > max) {
            max = count;
            subcategoryWithMostClosedDeals = subcategory;
        }
    }

    res.status(200).json({subcategory: subcategoryWithMostClosedDeals, amount: max});
}

exports.getSubcategoriesWithMostFailedDeals = async (req, res) => {
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

    let max = 0;
    let subcategoryWithMostFailedDeals = null;

    for (const subcategory of Subcategorys) {
        const subcategory_id = subcategory.id;

        const informationSubcategories = await InformationSubcategory.findAll({
            where: {
                subcategoryId: subcategory_id
            }
        });

        let count = 0;
        for (const informationSubcategory of informationSubcategories) {
            const information_id = informationSubcategory.informationId;
            const information = await Information.findOne({
                where: {
                    id: information_id
                }
            });
            count += 1 ? information.closed === 0 : 0;
        }

        if (count > max) {
            max = count;
            subcategoryWithMostFailedDeals = subcategory;
        }
    }

    res.status(200).json({subcategory: subcategoryWithMostFailedDeals, amount: max});
}