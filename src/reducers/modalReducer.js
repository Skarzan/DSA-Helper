const modal = {
  show: false,
  name: "",
  text: ""
};

const modalReducer = (state = modal, action) => {
  switch (action.type) {
    case "SHOWMODAL":
      return {
        show: true,
        heading: action.payload[0],
        text: action.payload[1]
      };

    case "CLOSEMODAL":
      return {
        show: false,
        heading: "",
        text: ""
      };
    default:
      return state;
  }
};
export default modalReducer;
