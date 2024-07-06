export default function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your packing list!</em>
            </p>
        );

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