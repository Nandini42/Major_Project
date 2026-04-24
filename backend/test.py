from google import genai

client = genai.Client(api_key="AIzaSyBwO1stt3uikUJSJvuumEsne8VxusjggR4")

# List models
models = client.models.list()
for m in models:
    print(m.name)