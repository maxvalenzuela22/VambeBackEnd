const { Information, Subcategory, InformationSubcategory, Category } = require('../models');
const llmService = require('../services/geminiService');
const Fuse = require('fuse.js');

const fuseOptions = {
    includeScore: true,
    threshold: 0.5,
    keys: ['name'],
};

const prepareSubcategoryIndex = async () => {
    const subcategories = await Subcategory.findAll({
        include: [{ model: Category, as: 'category' }]
    });

    return {
        fuse: new Fuse(subcategories.map(s => s.name), fuseOptions),
        subcategories
    };
};

const associateMessageWithHisSubcategories = async (message) => {
    const response = await llmService.categorizeMessage(message);
    if (!response || response.startsWith("Error")) {
        console.error(`Error en la categorización de: "${message}"`);
        return;
    }

    const subcategoryNames = response.split(', ');
    const { fuse, subcategories } = await prepareSubcategoryIndex();

    const information = await Information.findOne({ where: { message } });
    if (!information) {
        console.error(`No se encontró información con el mensaje: "${message}"`);
        return;
    }

    const categoriesSet = new Set();
    const assignedSubcategories = {};

    for (const subcategoryName of subcategoryNames) {
        const results = fuse.search(subcategoryName);
        let matchedSubcategory = results.length > 0 ? subcategories.find(s => s.name === results[0].item) : null;

        if (matchedSubcategory && !categoriesSet.has(matchedSubcategory.category.id)) {
            categoriesSet.add(matchedSubcategory.category.id);
            assignedSubcategories[matchedSubcategory.category.id] = matchedSubcategory.id;
        }
    }

    const allCategories = await Category.findAll();
    for (const category of allCategories) {
        if (!categoriesSet.has(category.id)) {
            const otherSubcategory = await Subcategory.findOne({ where: { name: "Otros", categoryId: category.id } });
            if (otherSubcategory) {
                assignedSubcategories[category.id] = otherSubcategory.id;
            }
        }
    }

    for (const subcategoryId of Object.values(assignedSubcategories)) {
        await InformationSubcategory.findOrCreate({
            where: { informationId: information.id, subcategoryId },
            defaults: { informationId: information.id, subcategoryId }
        });
    }
};

exports.getAssociations = async (req, res) => {
    const informations = await Information.findAll();
    for (const information of informations) {
        await associateMessageWithHisSubcategories(information.message);
    }
    res.json({ message: 'Asociaciones creadas exitosamente' });
};
