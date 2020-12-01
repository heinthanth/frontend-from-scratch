import { init } from "snabbdom/init";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";

const patch = init([eventListenersModule]);

let state = {};

// higher order function ... return function(props)
export const createComponent = ({
    element,
    methods = {},
    initialState = {},
}) => {
    state = initialState;
    let previousNode;

    const mappedMethods = (props) =>
        Object.keys(methods).reduce(
            (previous, k) => ({
                ...previous,
                [k]: (...args) => {
                    state = methods[k](state, ...args);
                    const nextNode = element({
                        props,
                        state,
                        methods: mappedMethods(props),
                    });
                    patch(previousNode.element, nextNode.element);
                    previousNode = nextNode;
                    return state;
                },
            }),
            {}
        );

    return (props) => {
        previousNode = element({
            props,
            state,
            methods: mappedMethods(props),
        });
        return previousNode;
    };
};
