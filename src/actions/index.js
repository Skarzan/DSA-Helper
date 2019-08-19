/* HERO ACTIONS */

/**
 *
 * @param {*} hero contains all values for a new hero
 */
export const addHero = hero => {
  return {
    type: "ADDHERO",
    payload: hero
  };
};

/**
 * @param {*} payload contains array [points, name, id]
 */
export const setPoint = payload => {
  return {
    type: "SETPOINT",
    payload
  };
};

/**
 *
 * @param {*} payload contains object{heroId, money}
 */
export const changeMoney = payload => ({
  type: "CHANGEMONEY",
  payload
});

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

/**
 *
 * @param {*} payload contains object{header, body}
 */
export const addToast = payload => ({
  type: "ADDTOAST",
  payload
});

/**
 *
 * @param {*} payload contains object{heading, text}
 */
export const deleteToast = payload => ({
  type: "DELETETOAST",
  payload
});
