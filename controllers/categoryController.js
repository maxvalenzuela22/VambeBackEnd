const { Information, Subcategory, InformationSubcategory } = require('../models');
const llmService = require('../services/geminiService');
const Fuse = require('fuse.js');

const fuseOptions = {
    includeScore: true,
    threshold: 0.5,
    keys: ['name'],
};

const prepareSubcategoryIndex = async () => {
    const subcategories = await Subcategory.findAll();
    const subcategoryList = subcategories.map(subcategory => subcategory.name);

    const fuse = new Fuse(subcategoryList, fuseOptions);
    return fuse;
};

const associateMessageWithHisSubcategories = async (message) => {
    const subcategories = await llmService.categorizeMessage(message);
    const subcategoryNames = subcategories.split(', ');

    const fuse = await prepareSubcategoryIndex();

    const information = await Information.findOne({
        where: {
            message: message
        }
    });
    const id_information = information.id;

    for (const subcategoryName of subcategoryNames) {
        const results = fuse.search(subcategoryName);
        const closestMatch = results.length > 0 ? results[0].item : null;

        if (closestMatch) {
            const subcategory = await Subcategory.findOne({
                where: {
                    name: closestMatch
                }
            });
            if (subcategory) {
                const id_subcategory = subcategory.id;

                const existingAssociation = await InformationSubcategory.findOne({
                    where: {
                        informationId: id_information,
                        subcategoryId: id_subcategory
                    }
                });

                if (!existingAssociation) {
                    await InformationSubcategory.create({
                        informationId: id_information,
                        subcategoryId: id_subcategory
                    });
                } else {
                    console.log(`La relación entre Information ID ${id_information} y Subcategory ID ${id_subcategory} ya existe.`);
                }
            }
        } else {
            console.warn(`No se encontró una subcategoría coincidente para: ${subcategoryName}`);
        }
    }
};

exports.getAssociations = async (req, res) => {
    const informations = await Information.findAll({});
    for (const information of informations) {
        await associateMessageWithHisSubcategories(information.message);
    }
    res.json({ message: 'Asociaciones creadas exitosamente' });
};
