'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.bulkInsert('Categories', [
      { name: 'Industria', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Volumen de Interacciones', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Motivación para Buscar Vambe', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Interés en Funcionalidades Específicas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tamaño de la Empresa', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Canal de Descubrimiento de Vambe', createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    await queryInterface.bulkInsert('Subcategories', [
      { name: 'Finanzas', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Comercio Electrónico', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Salud', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnología', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turismo', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Eventos', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Educación', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Logística', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Consultoría', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'ONG', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Restaurante', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Moda', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Otros', categoryId: categories[0].id, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Bajo', categoryId: categories[1].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Medio', categoryId: categories[1].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alto', categoryId: categories[1].id, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Incremento de volumen de consultas', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Necesidad de automatizar respuestas repetitivas', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Integración con sistemas existentes', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Personalización de respuestas', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mejorar la eficiencia operativa', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Optimización de tiempos', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Reducción de carga operativa', categoryId: categories[2].id, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Respuestas personalizadas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Integración con sistemas existentes', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Respuestas rápidas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gestión de consultas complejas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Escalabilidad durante temporadas altas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Soporte en varios idiomas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Automatización de procesos', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Actualización en tiempo real', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gestión de reservas', categoryId: categories[3].id, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Pequeña', categoryId: categories[4].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mediana', categoryId: categories[4].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Grande', categoryId: categories[4].id, createdAt: new Date(), updatedAt: new Date() },

      { name: 'Conferencia', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Webinar', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Artículo en línea', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Recomendación de un colega', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Podcast', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Publicación en LinkedIn', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Feria empresarial', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Recomendación en grupos de emprendedores', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Google', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'No hay información', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Otro', categoryId: categories[5].id, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subcategories', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
