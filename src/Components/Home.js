import React from 'react';
import { useState } from 'react';

function Home() {
    const imgurl = "https://framerusercontent.com/images/OFCQrikpA29U50XbIIX5fHudvM.png?scale-down-to=2048";
    // const imgurl = "./src/imagesAssets/astraveuDashboard.png";
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        setMessages([...messages, { text: userInput, sender: 'user' }]);
        setUserInput('');
        setIsLoading(true);

        try {
            let task = {
                question: userInput
            }
            console.log(task);

            // const response = await fetch('http://localhost:8008/askquestion', {
              const response = await fetch('http://13.61.153.212:8000/askquestion', {
              // const response = await fetch('http://16.16.63.232:8000/askquestion', {
          // const response = await fetch('http://192.168.0.244:8000/ask', 
          
                    method: 'POST',
                    // mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify({
                    //   question: userInput,
                    // }),
                    body:JSON.stringify(task)
                });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('===', data);
            setMessages([...messages, { text: userInput, sender: 'user' }, { text: data.response, sender: 'bot' }]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessages([...messages, { text: userInput, sender: 'user' }, { text: 'Error: Could not get a response.', sender: 'bot' }]);
        } finally {
            setIsLoading(false); // Set loading to false regardless of success/failure
        }
    };
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
        console.log(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    return (
        <div className='chatbot-popbox'>
      <div className="image-container">
        <img src={imgurl} alt='description' />
      </div>
      <div className="chatbot-container">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isLoading && <div className="message bot">Just a moment...</div>} {/* Display loading indicator */}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="how may I help you..."
          />
          <button onClick={sendMessage} disabled={isLoading}>Answer Me</button> {/* Disable button while loading */}
        </div>
      </div>
    </div>
    )
}










export default Home