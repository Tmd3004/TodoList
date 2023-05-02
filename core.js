export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x == 0)
    .join('');
}

export function createStore(reducer) {
    let state = reducer(); // trả về dữ liệu
    const roots = new Map();

    function render() {
       for (const [root, component] of roots) {
            const output = component(); // component là hàm App trong file app.js
            root.innerHTML = output; // đẩy code vào index.html qua id = "app"
        }
    }


    return {
        attach(component, root) {
            roots.set(root, component);  // root làm key và component làm value
            render();
        },
        connect(selector = state => state) {
            return component => (props, ...args) => //trả về hàm
                component(Object.assign({}, props, selector(state), ...args)); // chạy component nhận về biến props
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args); // nhận state trước đó làm đối số đầu vào, đẩy action sang và dữ liệu mới sang
            render();
        }
    }
}