import {useState} from "react";
import Navbar from "../components/Navbar";

function News() {
    const [chat, setChat] = useState([]);
    const [inputBox, setInputBox] = useState("");

    return (
        <>
            <Navbar />
            <form onSubmit={e => {setChat([...chat, inputBox]); e.preventDefault();}}>
                <input type="text"
                        placeholder="Chat"
                        className="input input-bordered"
                        value={inputBox}
                        onInput={e => setInputBox(e.target.value)}
                />
                <button type="submit">Send message</button>
            </form>

            <h1>Chat</h1>
            {chat.map((c, idx) => (
                <>
                    <div key={idx}>
                        <p>[You said] { c }</p>
                    </div>
                </>
            ))}
        </>
    )
}

export default News;
