const toast = [];
const toastReducer = (state = toast, action) => {
  switch (action.type) {
    case "ADDTOAST": {
      const newState = state;

      newState.push({
        header: action.payload[0],
        body: action.payload[1]
      });

      return [...newState];
    }
    case "DELETETOAST": {
      const newState = state;

      newState.splice(action.payload, 1); // payload = index

      return [...newState];
    }

    default:
      return state;
  }
};

export default toastReducer;
