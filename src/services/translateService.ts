export async function traducirTexto(texto: string): Promise<string> {
    try {
        const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: texto,
                source: "en",
                target: "es",
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        return data.translatedText || texto; // Si no se traduce, devuelve el original
    } catch (error) {
        console.error("Error al traducir:", error);
        return texto; // Evitar fallos en la app
    }
}
