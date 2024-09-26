"use client";
import { useState } from 'react';

const Weather = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
        
        try {
            const response = await fetch('https://agent-tutorial.vercel.app/get_weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city: input }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = data.response.output; // Access the correct property of the response
            setMessages((prev) => [...prev, { text: botMessage, sender: 'bot' }]);
        } catch (error) {
            console.error('Fetch error:', error);
            setMessages((prev) => [...prev, { text: 'Error fetching data.', sender: 'bot' }]);
        }

        setInput('');
    };

    return (
        <div className="sm:w-[68vw] w-[90vw] mx-auto p-4 bg-teal-50 h-[60vh] rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">Chat with Your Weather Agent</h1>
            <div className="border border-gray-300 rounded-lg p-4 h-[23rem] overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <strong className={`${msg.sender === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
                            {msg.sender === 'user' ? 'You' : 'Agent'}:
                        </strong>
                        <span className="ml-2">{msg.text}</span>
                    </div>
                ))}
            </div>
            
            <div className="flex flex-col sm:flex-row">
    <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} // Add this line
        placeholder="Ask about the weather..." 
        className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button 
        onClick={handleSend} 
        className="bg-blue-400 text-white mt-2 sm:mt-0 px-4 hover:bg-blue-600 transition"
    >
        Send
    </button>
</div>
        
        </div>
    );
};

export default Weather;