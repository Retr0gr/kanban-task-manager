
import { useEffect, useRef, useState, useCallback } from 'react';

const useWebSocket = (url) => {
    const ws = useRef(null);
    const [messages, setMessages] = useState([]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    useEffect(() => {
        function connect() {
            ws.current = new WebSocket(url);

            ws.current.onopen = () => console.log('WebSocket connected');
            // ws.current.onclose = () => {
            //     console.log('WebSocket disconnected. Attempting to reconnect...');
            //     setTimeout(connect, 5000); // Attempt to reconnect after a delay
            // };

            ws.current.onmessage = (event) => {

                const message = JSON.parse(event.data);
                // Append the new message without resending old messages
                setMessages((prevMessages) => [...prevMessages, message]);
            };
        }

        connect();

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);


    const sendMessage = (message) => {
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
            console.log("Sent!");
        }

    };



    return [messages, sendMessage, clearMessages];
};

export default useWebSocket;
