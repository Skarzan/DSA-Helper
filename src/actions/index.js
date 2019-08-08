export const addHero = hero => {
  return {
    type: "ADDHERO",
    payload: hero
  };
};

/**
 *
 * @param {*} payload contains array [heroId, conditionId]
 */
export const deleteConditionFromHero = payload => {
  return {
    type: "DELETECONDITIONFROMHERO",
    payload
  };
};

/**
 *
 * @param {*} payload contains array [heroId, conditionObject]
 */
export const addConditionToHero = payload => ({
  type: "ADDCONDITIONTOHERO",
  payload
});
