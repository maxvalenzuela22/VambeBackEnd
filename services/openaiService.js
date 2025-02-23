const openai = require('../config/openaiConfig');

async function categorizeMessage(message) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente experto en categorización de mensajes de clientes."
                },
                {
                    role: "user",
                    content: `Categoriza la siguiente transcripción de acuerdo a las dimensiones definidas:
                    
                    1. Industria: [Finanzas, Comercio Electrónico, Salud, Tecnología, Turismo, Eventos, Educación, Logística, Consultoría, ONG, Restaurante, Otros]
                    2. Volumen de Interacciones: [Bajo (menos de 100 interacciones diarias), Medio (100-250 interacciones diarias), Alto (más de 250 interacciones diarias)]
                    3. Motivación para Buscar Vambe: [Incremento de volumen de consultas, Necesidad de automatizar respuestas repetitivas, Integración con sistemas existentes, Personalización de respuestas, Mejorar la eficiencia operativa, Optimización de tiempos, Reducción de carga operativa]
                    4. Interés en Funcionalidades Específicas: [Respuestas personalizadas, Integración con sistemas existentes, Respuestas rápidas, Gestión de consultas complejas, Escalabilidad durante temporadas altas, Soporte en varios idiomas, Automatización de procesos, Actualización en tiempo real, Gestión de reservas]
                    5. Tamaño de la Empresa: [Pequeña (menos de 50 empleados), Mediana (50-200 empleados), Grande (más de 200 empleados)]
                    6. Canal de Descubrimiento de Vambe: [Conferencia, Webinar, Artículo en línea, Recomendación de un colega, Podcast, Publicación en LinkedIn, Feria empresarial, Recomendación en grupos de emprendedores, Otro]

                    Texto de la consulta:
                    "${message}"
                    
                    Devuelve solo una lista de subcategorías separadas por comas, sin explicaciones adicionales.
                    `
                }
            ],
            temperature: 0.5
        });

        const category = response.choices[0].message.content.trim();
        return category;
    } catch (error) {
        console.error("Error en OpenAI:", error);
        return 'Error';
    }
}

module.exports = {
    categorizeMessage
};
