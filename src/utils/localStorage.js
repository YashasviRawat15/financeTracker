export const loadState = () => {
    try {
        const serialized = localStorage.getItem('transactions_state')
        if (!serialized) return undefined
            return JSON.parse(serialized)
    } catch (e) {
        console.log(e);
    return undefined
    }
    }
    
    
    export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state)
        localStorage.setItem('transactions_state', serialized)
    } catch (e) {
        console.log(e);
    // ignore
    }
    }