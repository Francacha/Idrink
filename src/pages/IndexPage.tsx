import { useState, useEffect } from "react";
import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";
import { traducirTexto } from "../services/translateService";

export default function IndexPage() {
    const drinks = useAppStore((state) => state.drinks);
    
    const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);

    // Estado para guardar nombres traducidos
    const [translatedDrinks, setTranslatedDrinks] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Función para traducir todos los nombres
        const traducirNombres = async () => {
            const traducciones: { [key: string]: string } = {};

            await Promise.all(
                drinks.drinks.map(async (drink) => {
                    traducciones[drink.idDrink] = await traducirTexto(drink.strDrink);
                })
            );

            setTranslatedDrinks(traducciones);
        };

        if (hasDrinks) {
            traducirNombres();
        }
    }, [drinks]);

    return (
        <>
            <h1 className="text-6xl text-slate-800 font-extrabold">Tragos & Recetas</h1>

            {hasDrinks ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                    {drinks.drinks.map((drink) => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={{
                                ...drink,
                                strDrink: translatedDrinks[drink.idDrink] || drink.strDrink // Usa la traducción si está lista
                            }}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No hay resultados aún, utiliza el formulario para buscar recetas
                </p>
            )}
        </>
    );
}
