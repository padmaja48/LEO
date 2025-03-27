from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load the model and tokenizer
MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME, torch_dtype=torch.float16, device_map="auto")

# Chatbot function
def generate_response(prompt):
    try:
        inputs = tokenizer(prompt, return_tensors="pt").to("cuda")  # Ensure model runs on GPU if available

        # Debugging: Print the input tokens as text (CORRECT PLACEMENT)
        print("DEBUG: Input Text:", tokenizer.decode(inputs["input_ids"][0], skip_special_tokens=True))
        print(f"DEBUG: Input Tensor Shape: {inputs['input_ids'].shape}")

        output = model.generate(
            **inputs,
            max_new_tokens=150,
            do_sample=True,
            temperature=0.7,
            top_p=0.9
        )

        # Proper decoding to text
        response_text = tokenizer.decode(output[0], skip_special_tokens=True)

        print(f"DEBUG: Output Tensor Shape: {output.shape}")

        return response_text

    except Exception as e:
        return f"⚠️ Error generating response: {e}"

# Simple chat loop (optional)
def chat():
    print("Chatbot: Hello! How can I assist you today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            print("Chatbot: Goodbye!")
            break
        bot_response = generate_response(user_input)
        print(f"Chatbot: {bot_response}")

# Example test (or run the chat loop)
if __name__ == "__main__":
    chat()