module.exports = (sequelize, DataTypes) => {
    const InformationSubcategory = sequelize.define('InformationSubcategory', {
        informationId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Informations',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        subcategoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Subcategories',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    });

    return InformationSubcategory;
};
