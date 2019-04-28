"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const resize_observer_polyfill_1 = require("resize-observer-polyfill");
exports.default = (initialValue) => {
    const ref = react_1.useRef(initialValue);
    const [bounds, set] = react_1.useState({ width: 0, height: 0, left: 0, top: 0 });
    const [ro] = react_1.useState(() => new resize_observer_polyfill_1.default(([entry]) => {
        set(entry.contentRect);
    }));
    react_1.useEffect(() => {
        if (ref.current) {
            ro.observe(ref.current);
        }
        return () => ro.disconnect();
    }, [ref.current]);
    return [{ ref }, bounds];
};
