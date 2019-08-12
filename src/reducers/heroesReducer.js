import heroes from "../assets/heroes";

const heroesReducer = (state = heroes, action) => {
  switch (action.type) {
    case "ADDHERO": {
      let hero = action.payload[0];
      hero.id = state.length;
      hero.conditions = [];
      hero.lep = hero.maxLep;
      hero.asp = hero.maxAsp;
      hero.kap = hero.maxKap;
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
    case "CHANGECONDITION": {
      const heroId = action.payload[0];
      const condition = action.payload[1];

      //let newConditions = [...state[heroId].conditions];

      return state.map(hero => {
        if (hero.id === heroId) {
          let index = hero.conditions.findIndex(cond => {
            return cond.id === condition.id;
          });

          hero.conditions[index] = condition;
        }
        return hero;
      });
    }
    default:
      return state;
  }
};
export default heroesReducer;
