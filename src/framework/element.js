import { h } from "snabbdom/h";

const initialState = { element: "", event: {} };

const createReducer = (variables) => (previous, current, index) => {
    const current_variable = variables[index];
    // if current variable is event, just add to event
    if (current_variable && current_variable.type === "event")
        return { ...previous, event: { click: current_variable.click } };
    // else, add text node
    const element =
        previous.element +
        current +
        (current_variable === undefined ? "" : current_variable);
    return { ...previous, element };
};

/**
 * create element from template literal
 * it's high order function ...
 * return function(strings, ...args) {}
 */
export const createElement = (tag) => (strings, ...variables) => {
    const { element, event } = strings.reduce(
        createReducer(variables),
        initialState
    );
    let newElement = h(tag, { on: event }, element);
    return { type: "element", element: newElement };
};

export const div = createElement("div");
export const p = createElement("p");
