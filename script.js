async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    // Display user message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.textContent = userMessage;
    chatBox.appendChild(userMessageDiv);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    userInput.value = "";

    // Send message to backend
    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();

        // Display bot response
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot-message";
        botMessageDiv.textContent = data.response;
        chatBox.appendChild(botMessageDiv);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error communicating with the server:", error);
    }
}
