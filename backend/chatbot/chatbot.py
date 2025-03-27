from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os

# Set Hugging Face token
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise ValueError("❌ Hugging Face token is missing. Set HF_TOKEN as an environment variable.")

# Model name
MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"

# Detect device
device = "cuda" if torch.cuda.is_available() else "cpu"
dtype = torch.float16 if torch.cuda.is_available() else torch.float32

print("⏳ Loading model... This may take some time.")
try:
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, token=HF_TOKEN, padding_side="right")

    # Ensure tokenizer has a padding token
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Load model
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=dtype,
        device_map="auto",  # Automatically assigns layers to GPU/CPU
        trust_remote_code=True,
        low_cpu_mem_usage=True
    )

    print("✅ Model loaded successfully!")

except Exception as e:
    raise RuntimeError(f"❌ Error loading model: {e}")

# Chatbot function
def generate_response(prompt):
    try:
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True, max_length=512).to(device)

        print("\n[DEBUG] Input Token IDs:", inputs["input_ids"])

        output = model.generate(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            max_length=512,  # Ensure a valid max length
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            num_beams=5,  # Use beam search for better responses
            early_stopping=True,
            pad_token_id=tokenizer.eos_token_id,
            repetition_penalty=1.2,
        )

        print("\n[DEBUG] Output Token IDs:", output)

        if output is None or len(output[0]) == 0:
            print("⚠️ [WARNING] No output generated.")
            return "⚠️ No response generated."

        response = tokenizer.decode(output[0], skip_special_tokens=True)

        print("\n[DEBUG] Decoded Response:", response)

        return response

    except Exception as e:
        print(f"❌ ERROR: {e}")
        return f"⚠️ Error: {e}"






# Example test
if __name__ == "__main__":
    while True:
        user_input = input("\nYou: ")
        if user_input.lower() in ["exit", "quit"]:
            print("👋 Exiting chatbot...")
            break
        bot_response = generate_response(user_input)
        print("\n🤖 Chatbot:", bot_response)
