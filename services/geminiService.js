const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function categorizeMessage(message, retries = 3) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Categoriza la siguiente transcripción de acuerdo a las dimensiones definidas:

        1. **Industria**: [Finanzas, Comercio Electrónico, Salud, Tecnología, Turismo, Eventos, Educación, Logística, Consultoría, ONG, Restaurante, Moda, Otros]
        2. **Motivación para Buscar Vambe**: [Incremento de volumen de consultas, Necesidad de automatizar respuestas repetitivas, Integración con sistemas existentes, Personalización de respuestas, Mejorar la eficiencia operativa, Optimización de tiempos, Reducción de carga operativa]
        3. **Interés Funcionalidades**: [Respuestas personalizadas, Integración con sistemas existentes, Respuestas rápidas, Gestión de consultas complejas, Escalabilidad durante temporadas altas, Soporte en varios idiomas, Automatización de procesos, Actualización en tiempo real, Gestión de reservas]
        4. **Canal de Descubrimiento de Vambe**: [Conferencia, Webinar, Artículo en línea, Recomendación de un colega, Podcast, Publicación en LinkedIn, Feria empresarial, Recomendación en grupos de emprendedores, Google, No hay información, Otro]

        Texto de la consulta:
        "${message}"

        Instrucciones:
        1. **Devuelve solo las subcategorías exactas** de la lista, **sin agregar nada más**. Cada categoría debe ser una opción individual, **sin combinar ni modificar** las opciones.
        2. **No uses ninguna palabra que no esté en la lista**. Si el mensaje menciona una palabra que no está en las categorías, **no la uses en la respuesta**. Por ejemplo, si aparece "Clasificación automática de consultas", **no es una opción válida**.
        3. **Las opciones deben estar separadas por comas** y deben ser **exactas**. No hay espacio para variaciones ni combinaciones. Ejemplo incorrecto: "Clasificación automática de consultas" o "Tecnología, Educación". Ejemplo correcto: "Tecnología, Integración con sistemas existentes, Respuestas rápidas, Conferencia".
        4. Devuelve exactamente **cuatro categorías** para cada mensaje. Si encuentras más o menos, **el modelo está equivocado** y debes ajustarlo.
        5. Las categorías **no pueden ser de otro tipo**. Si el mensaje menciona algo fuera de las opciones proporcionadas (como "soporte técnico" o "clasificación automática de consultas"), **ignóralo y selecciona solo las opciones válidas** de las listas.
        6. **No uses combinaciones como "Pequeña-Grande"**, esto es incorrecto. Siempre selecciona **solo una opción** por cada categoría, como "Pequeña" o "Grande".
        7. La respuesta debe ser en **el formato de las opciones proporcionadas**, sin explicaciones ni números adicionales.
        8. No debes decir de que categoría es cada opción, solo debes devolver las opciones separadas por comas.

        Ejemplo de respuesta válida:
        "Salud, Personalización de respuestas, Soporte en varios idiomas, Feria Empresarial"

        Asegúrate de que las respuestas sean **precisas** y que **cada opción sea devuelta tal cual está en la lista proporcionada**. Si tienes dudas sobre una opción, elige **la que más se acerque** al mensaje dentro de las opciones disponibles.
        `;

        const response = await model.generateContent(prompt);
        const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text;

    } catch (error) {
        if (error.status === 429 && retries > 0) {
            console.warn(`Límite de solicitudes alcanzado. Reintentando en 5 segundos... (${retries} intentos restantes)`);
            await new Promise(res => setTimeout(res, 5000));
            return categorizeMessage(message, retries - 1);
        }
        console.error("Error en Gemini:", error);
        return "Error: Servicio no disponible";
    }
}


module.exports = {
    categorizeMessage
};
