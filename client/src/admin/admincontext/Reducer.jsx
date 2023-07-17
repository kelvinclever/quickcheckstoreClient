const Reducer = (state, action) => {
    switch (action.type) {

        case "customers":
            return {
                ui: action.payload
            }
        case "products":
            return {
                ui: action.payload
            }
        case "profile":
            return {
                ui: action.payload
            }
            case "admins":
            return {
                ui: action.payload
            }
        
            case "orders":
            return {
                ui: action.payload
            }
        default:
            return state;
    }
}

export default Reducer;
