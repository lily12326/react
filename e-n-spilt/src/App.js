import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    //(show)傳入當前的 showAddFriend 狀態值
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    //使用spread operator才不會改變原數據
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
  }
  function handleSplitBill(value) {
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend))
    setSelectedFriend(null)
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill key={selectedFriend.id} selectedFriend={selectedFriend} onSpiltBill={handleSplitBill} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {


  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  //optional chaining 
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">You owe {friend.name} {Math.abs(friend.balance)}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{friend.name} owes you {Math.abs(friend.balance)}</p>
      )}
      {friend.balance === 0 && (
        <p className="red">You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Selected"}</Button>
    </li>
  );
}



function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID()
  function handleSubmit(e) {
    //submit會重新讀取（？
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSpiltBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUsers] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : '';
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSpiltBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label>🧍‍♀️ Your expense</label>
      <input type="text" value={paidByUser} onChange={(e) => setPaidByUsers(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
      <label>👫  {selectedFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />
      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend"> {selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
