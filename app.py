from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load queries and responses from JSON file
with open('queries.json', 'r') as f:
    queries_data = json.load(f)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()
    response = queries_data.get(user_message, "Sorry, I didn't understand that. Can you try rephrasing?")
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
