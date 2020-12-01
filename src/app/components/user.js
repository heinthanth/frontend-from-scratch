import { createComponent } from "../../framework/component";
import { div } from "../../framework/element";
import { onClick } from "../../framework/event";

const initialState = { greetingId: 4 };

const changeId = (state, id) => ({ ...state, greetingId: id });
const methods = { changeId };

const element = (ctx) => {
    // ctx = { props: {}, state: {}, methods: {} }
    return div`${onClick(() => {
        ctx.methods.changeId(++ctx.state.greetingId);
    })}Hello, it's me ... state: { greetingId: ${ctx.state.greetingId} }`;
};

export const User = createComponent({ element, methods, initialState });
