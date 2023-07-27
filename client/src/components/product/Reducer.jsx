const Reducer = (state, action) => {
    switch (action.type) {
      case "Phones & tablets":
        return {
          ui: action.payload
        };
      case "Sports":
        return {
          ui: action.payload
        };
        case "AllProducts":
          return {
            ui: action.payload
          };
      case "Computing":
        return {
          ui: action.payload
        };
      case "Gaming":
        return {
          ui: action.payload
        };
      case "Health & beauty":
        return {
          ui: action.payload
        };
      case "TVs & Audio":
        return {
          ui: action.payload
        };
      case "Supermarket":
        return {
          ui: action.payload
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  