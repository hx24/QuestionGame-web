export default function loadings(state = {}, action) {
    switch (action.type) {
        case 'updateGlobalLoading':
            return {
                ...state,
                ...action.payload,
            };


        default:
            return state;
    }
}