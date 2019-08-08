import heroes from "../assets/heroes";

const heroesReducer = (state = heroes, action) => {
  switch (action.type) {
    case "ADDHERO":
      return [...state, action.payload];
    case "DELETECONDITIONFROMHERO": {
      const heroId = action.payload[0];
      const conditionId = action.payload[1];

      let filtered = state[heroId].conditions.filter(
        (condition, index, arr) => {
          return condition.conditionId != conditionId;
        }
      );

      return state.map(hero => {
        if (hero.id === heroId) {
          hero.conditions = filtered;
        }
        return hero;
      });
    }
    case "ADDCONDITIONTOHERO": {
      const heroId = action.payload[0];
      const condition = action.payload[1];

      const newConditions = [...state[heroId].conditions, condition];
      return state.map(hero => {
        if (hero.id === heroId) {
          hero.conditions = newConditions;
        }
        return hero;
      });
    }
    default:
      return state;
  }
};
export default heroesReducer;
