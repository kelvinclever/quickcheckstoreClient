const Reducer = (state, action) => {
    switch (action.type) {
      case "Phones & tablets":
        return {
          categories: action.payload
        };
      case "Sports":
        return {
          categories: action.payload
        };
        case "AllProducts":
          return {
            categories: action.payload
          };
      case "Computing":
        return {
          categories: action.payload
        };
      case "Gaming":
        return {
          categories: action.payload
        };
      case "Health & beauty":
        return {
          categories: action.payload
        };
      case "TVs & Audio":
        return {
          categories: action.payload
        };
      case "Supermarket":
        return {
          categories: action.payload
        };
        case "Home & Office":
          return {
            categories: action.payload
          };
      default:
        return state;
    }
  };
  
  export default Reducer;
  