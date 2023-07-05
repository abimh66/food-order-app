import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://react-project-abimh66-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
        );
        if (!response.ok) throw new Error('Failed');

        const responseData = await response.json();

        const loadedMeals = [];
        for (let key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (err) {
        setHttpError(true);
      } finally {
        setIsLoading(false);
      }
    };
    (() => fetchMeals())();
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !httpError && <ul>{mealsList}</ul>}
        {isLoading && <p className={classes.loading}>Fetching data...</p>}
        {!isLoading && httpError && (
          <p className={classes['text-error']}>Something went wrong❌</p>
        )}
      </Card>
    </section>
  );
};

export default AvailableMeals;
