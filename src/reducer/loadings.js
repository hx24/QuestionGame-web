export default function loadings(state = {}, action) {
    switch (action.type) {
        case 'updateLoading':
            return {
                ...state,
                ...action.payload,
            };


        default:
            return state;
    }
}