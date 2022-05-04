
const initialState = {
    dataInfo: []
}

const stateAction = (state = initialState, action) => {
    switch (action.type) {
        case 'DATA':
            return{
                ...state,
                dataInfo: action.payload.dataInfo
            }
        default: {
            return state
        }
    }
}

export default stateAction