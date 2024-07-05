import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true },
    { id: 3, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
    const [items, setItems] = useState([]);


    function handleAddItems(item) {
        setItems((items) => [...items, item])
    }
    function deleteItems(id) {
        setItems((items) => items.filter(item => item.id !== id))
    }
    function handleToggleItem(id) {
        setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
    }
    return <div className="app">
        <Logo />
        <Form onAddItmes={handleAddItems} />
        <PackingList items={items} onDeleteItem={deleteItems} onToggleItens={handleToggleItem} />
        <Stats items={items} />
    </div>
}
function Logo() {
    return <h1>Far Away</h1>;
}
function Form({ onAddItmes }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);




    function handleSubmit(e) {
        //防止頁面刷新，這裡傳入的e是指event object
        e.preventDefault();
        if (!description) return;
        const newItem = { description, quantity, packed: false, id: Date.now() }
        console.log(newItem);
        onAddItmes(newItem);
        setDescription("");
        setQuantity(1);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (<option value={num} key={num}>{num}</option>))}
            </select>
            <input type="text" placeholder="Add an item" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button >Add Item</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggleItens }) {
    return (
        <ul className="LIST">
            {items.map((item) => <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItens={onToggleItens} />)}
        </ul>
    )
}

function Item({ item, onDeleteItem, onToggleItens }) {
    return (
        <li >
            <input type="checkbox" vlaue={item.checked} onChange={() => onToggleItens(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity}{item.description}</span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li >
    )
}

function Stats({ items }) {
    /*   if (!items.length)
          return (
              <p className="stats">
                  <em>Start adding some items to your packing list!</em>
              </p>
          );
   */
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    return (
        <footer className="stats">
            <em>
                {numItems === 0 ?
                    "You got everything! Ready to go"
                    : `You have ${numItems} items on your list, and you already packed ${numPacked} items`}
            </em>
        </footer>
    )
}