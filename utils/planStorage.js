import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAN_KEY = 'meal-plan-v1';


export function normalizeDayLabel(label = '') {
  return String(label).split(' ')[0];
}

export async function getPlan() {
  const raw = await AsyncStorage.getItem(PLAN_KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function saveMeal(dayLabel, meal, dish) {
  const day = normalizeDayLabel(dayLabel);
  const plan = await getPlan();
  if (!plan[day]) plan[day] = {};
  plan[day][meal] = dish;
  await AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  return plan;
}