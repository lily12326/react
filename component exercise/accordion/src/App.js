import "./index.css";
import { useState } from "react";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <>
      <div className="accordion">
        {data.map((faq, index) => (
          <AccordionItems
            curOpen={curOpen}
            onOpen={setCurOpen}
            key={index}
            num={index + 1}
            title={faq.title}>
            {faq.text}
          </AccordionItems>

        ))}
        <AccordionItems
          curOpen={curOpen}
          onOpen={setCurOpen}
          key="test 1"
          num={23}
          title="test 1">
          <p>
            <ul>
              <li>Break up UI into Components</li>
              <li>Make components reuseable</li>
              <li>Place state efficiently</li>
            </ul>
          </p>
        </AccordionItems>
      </div>
    </>
  )
}

function AccordionItems({ num, title, curOpen, onOpen, children }) {
  //const [isOpen, setIsOpen] = useState(false);
  const isOpen = num === curOpen;
  function handleToggle() {
    //setIsOpen((isOpen) => !isOpen)
    onOpen(isOpen ? null : num)
  }
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle} >
      <p className="number">{num}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}

    </div >
  )
}
