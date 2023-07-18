const Reducer = (state, action) => {
    switch (action.type) {

        case "Phones & tablets":
            return {
                ui: action.payload
            }
        case "Fashion":
            return {
                ui: action.payload
            }
        case "Computing":
            return {
                ui: action.payload
            }
            case "Gaming":
            return {
                ui: action.payload
            }
        
            case "Health & beauty":
            return {
                ui: action.payload
            }
            case "Home & Office":
                return {
                    ui: action.payload
                }
        default:
            return state;
    }
}

export default Reducer;
