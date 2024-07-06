import { useState } from "react";
export default function Form({ onAddItmes }) {
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
