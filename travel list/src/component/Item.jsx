export default function Item({ item, onDeleteItem, onToggleItens }) {
    return (
        <li >
            <input
                type="checkbox"
                vlaue={item.checked}
                onChange={() => onToggleItens(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li >
    );
}