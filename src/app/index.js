import { render } from "../framework";
import { User } from "./components/user";

render("#app", User({ greetingId: 2 }));
