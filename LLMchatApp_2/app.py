import streamlit as st
import requests
import json
import time
from config import API_URL, HEADERS

class LLMChatApp:
    def __init__(self):
        self.setup_page_config()
        self.setup_custom_css()
        
    def setup_page_config(self):
        st.set_page_config(
            page_title="Aloha AI Chat",
            page_icon="🌴",
            layout="centered",
            initial_sidebar_state="collapsed"
        )
    
    def setup_custom_css(self):
        st.markdown("""
        <style>
        /* Main container styling */
        .main {
            background-color: #0E1117;
            color: #FAFAFA;
        }
        
        /* Chat message styling */
        .user-message {
            background-color: #1E293B;
            padding: 1rem;
            border-radius: 1rem 1rem 0 1rem;
            margin: 0.5rem 0;
            border: 1px solid #334155;
            max-width: 80%;
            margin-left: auto;
        }
        
        .ai-message {
            background-color: #1E3A8A;
            padding: 1rem;
            border-radius: 1rem 1rem 1rem 0;
            margin: 0.5rem 0;
            border: 1px solid #3B82F6;
            max-width: 80%;
            margin-right: auto;
        }
        
        /* Input field styling */
        .stTextInput>div>div>input {
            background-color: #1F2937;
            color: white;
            border: 1px solid #374151;
            border-radius: 0.5rem;
        }
        
        /* Button styling */
        .stButton>button {
            background-color: #3B82F6;
            color: white;
            border: none;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            width: 100%;
        }
        
        .stButton>button:hover {
            background-color: #2563EB;
        }
        
        /* Header styling */
        .header {
            text-align: center;
            padding: 2rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 1rem;
            margin-bottom: 2rem;
        }
        
        /* Sidebar styling */
        .css-1d391kg {
            background-color: #0E1117;
        }
        </style>
        """, unsafe_allow_html=True)
    
    def query_huggingface(self, payload):
        """Send query to Hugging Face API"""
        try:
            response = requests.post(
                API_URL, 
                headers=HEADERS, 
                json=payload,
                timeout=30
            )
            return response.json()
        except Exception as e:
            st.error(f"API Error: {str(e)}")
            return None
    
    def generate_response(self, message, conversation_history):
        """Generate AI response using Hugging Face model"""
        # Prepare the prompt with conversation history
        if conversation_history:
            # For DialoGPT and similar models
            inputs = {
                "text": message,
                "past_user_inputs": [msg["content"] for msg in conversation_history if msg["role"] == "user"],
                "generated_responses": [msg["content"] for msg in conversation_history if msg["role"] == "assistant"]
            }
        else:
            inputs = {"inputs": message}
        
        response = self.query_huggingface(inputs)
        
        if response and 'generated_text' in response:
            return response['generated_text']
        elif response and isinstance(response, list) and 'generated_text' in response[0]:
            return response[0]['generated_text']
        else:
            return "I apologize, but I couldn't generate a response. Please try again."
    
    def display_message(self, message, is_user=False):
        """Display chat message with appropriate styling"""
        if is_user:
            st.markdown(f"""
            <div class="user-message">
                <strong>You:</strong><br>
                {message}
            </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="ai-message">
                <strong>AI:</strong><br>
                {message}
            </div>
            """, unsafe_allow_html=True)
    
    def run(self):
        """Main application loop"""
        # Header
        st.markdown("""
        <div class="header">
            <h1>🌴 Aloha Ai Chat</h1>
            <p>Powered by Hugging Face Transformers</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Initialize session state
        if "messages" not in st.session_state:
            st.session_state.messages = []
        
        if "conversation_started" not in st.session_state:
            st.session_state.conversation_started = False
        
        # Display chat history
        for message in st.session_state.messages:
            self.display_message(
                message["content"], 
                message["role"] == "user"
            )
        
        # Chat input
        col1, col2 = st.columns([4, 1])
        
        with col1:
            user_input = st.text_input(
                "Type your message...",
                key="user_input",
                label_visibility="collapsed",
                placeholder="Ask me anything..."
            )
        
        with col2:
            send_button = st.button("Send", use_container_width=True)
        
        # Clear chat button in sidebar
        with st.sidebar:
            st.markdown("### Chat Controls")
            if st.button("Clear Chat", use_container_width=True):
                st.session_state.messages = []
                st.session_state.conversation_started = False
                st.rerun()
            
            st.markdown("---")
            st.markdown("### Model Info")
            st.info("Using Hugging Face Transformers")
            st.markdown("---")
            st.markdown("### About")
            st.write("This is a portfolio project demonstrating LLM integration with a modern dark UI.")
        
        # Handle user input
        if (send_button or user_input) and user_input.strip():
            # Add user message to chat
            st.session_state.messages.append({"role": "user", "content": user_input.strip()})
            st.session_state.conversation_started = True
            
            # Generate AI response
            with st.spinner("AI is thinking..."):
                ai_response = self.generate_response(
                    user_input.strip(), 
                    st.session_state.messages[:-1]  # Exclude current message
                )
            
            # Add AI response to chat
            st.session_state.messages.append({"role": "assistant", "content": ai_response})
            
            # Rerun to update the display
            st.rerun()
        
        # Welcome message for new conversation
        if not st.session_state.conversation_started:
            st.markdown("""
            <div style='text-align: center; padding: 2rem; color: #94A3B8;'>
                <h3>Welcome to your AI Assistant! 👋</h3>
                <p>Start a conversation by typing a message above.</p>
            </div>
            """, unsafe_allow_html=True)

if __name__ == "__main__":
    app = LLMChatApp()
    app.run()