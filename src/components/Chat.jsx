import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import '../App.css';
import '@fontsource/inter';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import { GoogleGenerativeAI } from "@google/generative-ai";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CircularProgress from '@mui/joy/CircularProgress';
import { BackgroundGradient } from "./ui/background-gradient";

export const Chat = () => {
    const [userText, setUserText] = useState('');
    const [messages, setMessages] = useState([
        {id: 1, sender: "AI", data: "I look forward to assisting you!"}
    ]);
    const [loading, setLoading] = useState(false);

    const addMessage = (sender, data) => {
        const newMsg = { id: messages.length+1, sender: sender, data: data };
        setMessages(prevMessages => [...prevMessages, newMsg]);
    }

    const Message = ({ sender, data }) => {
        if (sender == "User")
            return <ListItem variant="soft" color="primary" size="lg" sx={{textAlign: 'right', borderRadius: 25, maxWidth: 550, minWidth: 550, minHeight: 65, padding: 3}}><ListItemDecorator>👤</ListItemDecorator> {data}</ListItem>
        if (sender == "AI")
            return <ListItem variant="soft" color="success" size="lg" sx={{borderRadius: 25, maxWidth: 550, minWidth: 550, minHeight: 65, padding: 3}}><ListItemDecorator>🤖</ListItemDecorator> {data}</ListItem>
    }

    const sendPrompt = async () =>{
        if (userText.trim()==='') return;
        addMessage("User", userText);
        setUserText('');
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_KEY;
            const genAI = new GoogleGenerativeAI(apiUrl);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
            const prompt = userText + ", no blabbing. 1-3 sentences maximum.";

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            addMessage("AI", text);
        } catch (error) {
            console.error('Error generating AI response:', error);
            addMessage("AI", "Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div class="messages-container">
                    <List
                        sx={{
                            gap: 1,
                        }} visible={!loading}>
                        {messages.map((message) => <Message key={message.id} sender={message.sender} data={message.data} />)}
                        
                    </List>
                    { loading ? <CircularProgress variant="soft" /> : null }
                    
                </div>
                
                <div class="flex-horizontal">
                    <Textarea
                        minRows={1} 
                        placeholder="Enter your prompt" 
                        size="lg" 
                        variant="soft"
                        value={userText}
                        onChange={event => setUserText(event.target.value)}
                        disabled={loading}
                        sx={{maxWidth: 1000, minWidth: 550}}
                        />
                        
                    <IconButton variant="soft" size="lg" onClick={sendPrompt}><SendRoundedIcon/></IconButton>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}