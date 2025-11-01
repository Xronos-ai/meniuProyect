import React, { createContext, useState, useContext } from 'react';

const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  // Estructura: { Lunes: { Desayuno: "Pastel de choclo", Almuerzo: null, Cena: null } }
  const [mealsByDay, setMealsByDay] = useState({
    Lunes: {},
    Martes: {},
    Miércoles: {},
    Jueves: {},
    Viernes: {},
    Sábado: {},
    Domingo: {},
  });

  const setMealForDay = (day, mealType, dishName) => {
    setMealsByDay((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: dishName,
      },
    }));
  };

  return (
    <MealsContext.Provider value={{ mealsByDay, setMealForDay }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => useContext(MealsContext);
