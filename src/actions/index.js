/* HERO ACTIONS */
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

/**
 *
 * @param {*} payload contains array [heroId, conditionObject]
 */
export const changeCondition = payload => ({
  type: "CHANGECONDITION",
  payload
});

/* MODAL ACTIONS */

/**
 *
 * @param {*} payload contains object{heading, text}
 */
export const showModal = payload => ({
  type: "SHOWMODAL",
  payload
});

/**
 *
 * @param {*} payload contains object{heading, text}
 */
export const closeModal = () => ({
  type: "CLOSEMODAL"
});
