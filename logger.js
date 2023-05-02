export default function logger(reducer) {
    return (prevstate, action, args) => {
        console.group(action);
        console.log('Previous state: ', prevstate);
        console.log('Action arguments: ', args);
        const nextState = reducer(prevstate, action, args);
        console.log('Next state: ', nextState);
        console.groupEnd();
        return nextState;
    }
}