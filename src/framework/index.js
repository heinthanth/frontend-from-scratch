import { init } from "snabbdom/init";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";

const patch = init([eventListenersModule]);

export const render = (selector, component) => {
    const mountpoint = document.querySelector(selector);
    patch(mountpoint, component.element);
};
