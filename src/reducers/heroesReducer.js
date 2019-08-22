import heroes from "../assets/heroes";

const heroesReducer = (state = [], action) => {
  switch (action.type) {
    case "SETALLHEROES": {
      return action.payload;
    }
    case "ADDHERO": {
      let hero = action.payload[0];
      hero.id = state.length;
      hero.conditions = [];
      hero.LeP = hero.maxLep;
      hero.AsP = hero.maxAsp;
      hero.KaP = hero.maxKap;
      hero.money = 0;

      if (hero.maxAsp <= 0) {
        hero.maxAsp = null;
      }

      if (hero.maxKap <= 0) {
        hero.maxKap = null;
      }

      const newHeroes = [...state, hero];

      return newHeroes;
    }

    case "SETPOINT": {
      const points = action.payload[0];
      const name = action.payload[1];
      const heroId = action.payload[2];

      let newState = state;
      newState[heroId][name] = points;

      return [...newState];
    }

    case "DELETECONDITIONFROMHERO": {
      const heroId = action.payload[0];
      const conditionId = action.payload[1];

      let newState = state;

      newState[heroId].conditions.splice(conditionId, 1);

      return [...newState];
    }
    case "ADDCONDITIONTOHERO": {
      const heroId = action.payload[0];
      const condition = action.payload[1];

      let newState = state;
      newState[heroId].conditions = [...newState[heroId].conditions, condition];

      return [...newState];
    }
    case "CHANGECONDITION": {
      const heroId = action.payload[0];
      const conditionIndex = action.payload[1];
      const condition = action.payload[2];

      let newState = state;

      newState[heroId].conditions[conditionIndex] = condition;

      return [...newState];
    }
    case "CHANGEMONEY": {
      const heroId = action.payload[0];
      const money = action.payload[1];

      return state.map(hero => {
        if (hero.id === heroId) {
          hero.money = money;
        }

        return hero;
      });
    }

    default:
      return state;
  }
};
export default heroesReducer;
