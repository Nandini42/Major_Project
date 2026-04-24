# import os
# import time
# import threading
# from datetime import datetime, timedelta

# import numpy as np
# import faiss
# import requests
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from sentence_transformers import SentenceTransformer
# from google import genai

# # ---------------------------------------------------
# # 1️⃣ CONFIG
# # ---------------------------------------------------
# GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# if not GNEWS_API_KEY:
#     raise ValueError("GNEWS_API_KEY not set")
# if not GEMINI_API_KEY:
#     raise ValueError("GEMINI_API_KEY not set")

# client = genai.Client(api_key=GEMINI_API_KEY)

# app = Flask(__name__)
# CORS(app)

# # ---------------------------------------------------
# # 2️⃣ LOAD FREE LOCAL EMBEDDING MODEL
# # ---------------------------------------------------
# print("Loading local embedding model (all-MiniLM-L6-v2)...")
# embedder = SentenceTransformer("all-MiniLM-L6-v2")
# print("Embedding model loaded.")

# articles_store = []
# index = None

# # ---------------------------------------------------
# # 3️⃣ TOPIC TAGGER (OPTIONAL BOOST)
# # ---------------------------------------------------
# def classify_topic(text: str) -> str:
#     t = text.lower()
#     if any(k in t for k in ["match", "t20", "world cup", "cricket", "football", "nba", "goal"]):
#         return "sports"
#     if any(k in t for k in ["election", "government", "parliament", "minister", "policy", "president"]):
#         return "politics"
#     if any(k in t for k in ["health", "disease", "virus", "hospital", "medical", "covid"]):
#         return "health"
#     if any(k in t for k in ["ai", "software", "tech", "google", "microsoft", "apple"]):
#         return "technology"
#     return "world"

# # ---------------------------------------------------
# # 4️⃣ FETCH NEWS FROM GNEWS BY DOMAINS (LAST 2 DAYS)
# # ---------------------------------------------------
# DOMAINS = {
#     "sports": "sports OR cricket OR match OR T20 OR World Cup",
#     "politics": "politics OR election OR government OR parliament OR president",
#     "world": "world OR international OR global",
#     "health": "health OR medical OR disease OR virus OR hospital",
#     "technology": "technology OR tech OR AI OR software OR Google OR Microsoft OR Apple"
# }

# def fetch_latest_news_by_domains(days=2, max_per_page=25, pages=2, lang="en"):
#     base_url = "https://gnews.io/api/v4/search"
#     from_date = (datetime.utcnow() - timedelta(days=days)).strftime("%Y-%m-%dT%H:%M:%SZ")

#     all_articles = []

#     for domain, query in DOMAINS.items():
#         for page in range(1, pages + 1):
#             params = {
#                 "q": query,
#                 "lang": lang,
#                 "from": from_date,
#                 "max": max_per_page,
#                 "page": page,
#                 "apikey": GNEWS_API_KEY
#             }

#             resp = requests.get(base_url, params=params, timeout=20)
#             if resp.status_code != 200:
#                 print(f"GNews error for {domain}:", resp.status_code, resp.text)
#                 continue

#             data = resp.json()
#             articles = data.get("articles", [])

#             for a in articles:
#                 title = (a.get("title") or "").strip()
#                 desc = (a.get("description") or "").strip()
#                 source = (a.get("source") or {}).get("name", "")
#                 url = a.get("url", "")
#                 published = a.get("publishedAt", "")

#                 embed_text = f"{title}. {desc}".strip()
#                 if not embed_text:
#                     continue

#                 topic = classify_topic(embed_text)

#                 all_articles.append({
#                     "embed_text": embed_text,
#                     "title": title,
#                     "description": desc,
#                     "source": source,
#                     "url": url,
#                     "publishedAt": published,
#                     "topic": topic
#                 })

#     # Deduplicate by URL
#     unique = {}
#     for a in all_articles:
#         unique[a["url"]] = a

#     return list(unique.values())

# # ---------------------------------------------------
# # 5️⃣ BUILD / REFRESH FAISS INDEX
# # ---------------------------------------------------
# def build_index():
#     global articles_store, index

#     print("Fetching news from GNews (sports, politics, world, health, technology)...")
#     articles = fetch_latest_news_by_domains(days=2, max_per_page=25, pages=2)

#     if not articles:
#         print("No news fetched. Check GNEWS_API_KEY / rate limits.")
#         index = None
#         return

#     articles_store = articles
#     print(f"Total articles indexed: {len(articles_store)}")

#     print("Generating embeddings (title + description only)...")
#     texts = [a["embed_text"] for a in articles_store]
#     embeddings = embedder.encode(texts, show_progress_bar=True)
#     embeddings = np.array(embeddings, dtype="float32")

#     faiss.normalize_L2(embeddings)
#     dim = embeddings.shape[1]
#     index = faiss.IndexFlatIP(dim)
#     index.add(embeddings)

#     # Debug coverage
#     from collections import Counter
#     topics = Counter([a["topic"] for a in articles_store])
#     print("Topic distribution:", topics)

#     print("FAISS index built successfully.")

# # Build at startup
# build_index()

# # Optional: refresh every 6 hours
# def refresh_index_every_6_hours():
#     while True:
#         try:
#             print("Refreshing FAISS index...")
#             build_index()
#             print("Index refreshed.")
#         except Exception as e:
#             print("Refresh failed:", e)
#         time.sleep(6 * 60 * 60)

# threading.Thread(target=refresh_index_every_6_hours, daemon=True).start()

# # ---------------------------------------------------
# # 🔥 6️⃣ SMART CHAT ROUTE (HYBRID AI)
# # ---------------------------------------------------

# def detect_intent(question: str):
#     q = question.lower()

#     if any(k in q for k in ["gold price", "silver price", "stock", "bitcoin", "crypto"]):
#         return "finance"

#     if any(k in q for k in ["who won", "winner", "match result", "t20", "ipl", "world cup"]):
#         return "sports"

#     if any(k in q for k in ["news", "latest", "today", "recent"]):
#         return "news"

#     return "general"


# def get_gold_price():
#     # 1️⃣ Try reliable API (GoldAPI)
#     try:
#         url = "https://www.goldapi.io/api/XAU/USD"
#         headers = {
#             "x-access-token": os.getenv("GOLD_API_KEY"),  # You need to set this
#             "Content-Type": "application/json"
#         }

#         res = requests.get(url, headers=headers, timeout=10)

#         if res.status_code == 200:
#             data = res.json()
#             price = data.get("price")

#             if price:
#                 return f"Current gold price is approximately ${price} per ounce."

#     except Exception as e:
#         print("GoldAPI failed:", e)

#     # 2️⃣ Fallback → Gemini (always works)
#     try:
#         prompt = "What is the current gold price in USD? Give approximate latest value."
#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )
#         return response.text
#     except:
#         return "Unable to fetch gold price right now."


# @app.route("/chat", methods=["POST"])
# def chat():
#     # ---------------------------------------------------
# # 🧠 STRICT NEWS-ONLY CHAT ROUTE
# # ---------------------------------------------------

# def is_news_related(question: str):
#     q = question.lower()

#     keywords = [
#         "news", "latest", "today", "recent",
#         "government", "election", "minister", "policy",
#         "match", "t20", "world cup", "cricket", "sports",
#         "war", "global", "international",
#         "health", "covid", "virus",
#         "technology", "ai", "google", "microsoft"
#     ]

#     return any(k in q for k in keywords)


# @app.route("/chat", methods=["POST"])
# def chat():
#     global articles_store, index

#     data = request.get_json(silent=True) or {}
#     question = data.get("question", "").strip()

#     if not question:
#         return jsonify({"error": "Question is required"}), 400

#     # ---------------------------------------------------
#     # ❌ BLOCK NON-NEWS QUESTIONS
#     # ---------------------------------------------------
#     if not is_news_related(question):
#         return jsonify({
#             "answer": "I can answer only news-related queries.",
#             "sources": []
#         })

#     # ---------------------------------------------------
#     # 🟢 NEWS (RAG SYSTEM)
#     # ---------------------------------------------------
#     if index is None or not articles_store:
#         return jsonify({
#             "answer": "News data is not ready yet. Please try again.",
#             "sources": []
#         })

#     try:
#         q_emb = embedder.encode([question]).astype("float32")
#         faiss.normalize_L2(q_emb)

#         k = min(5, int(index.ntotal))
#         distances, indices = index.search(q_emb, k)

#         retrieved = [
#             articles_store[int(i)]
#             for i in indices[0]
#             if 0 <= int(i) < len(articles_store)
#         ]

#         context = "\n\n".join([
#             f"Title: {a['title']}\nSummary: {a['description']}\nSource: {a['source']}"
#             for a in retrieved
#         ])

#         prompt = f"""
# You are a NEWS assistant.

# STRICT RULES:
# - Answer ONLY using the news context.
# - Keep answer SHORT and clear (2–3 lines).
# - Do NOT add extra explanations.
# - If answer is not found, say:
#   "No relevant news found in the last 2 days."

# Context:
# {context}

# Question:
# {question}

# Answer:
# """

#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         return jsonify({
#             "answer": response.text.strip(),
#             "sources": [{"title": a["title"], "url": a["url"]} for a in retrieved]
#         })

#     except Exception as e:
#         print("Error:", e)
#         return jsonify({
#             "answer": "Something went wrong while fetching news.",
#             "sources": []
#         })
        
# # ---------------------------------------------------
# # 7️⃣ RUN
# # ---------------------------------------------------
# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False)

import os
import time
import threading
from datetime import datetime, timedelta
import re

import numpy as np
import faiss
import requests
import torch
import joblib

from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from transformers import BertTokenizer, BertForSequenceClassification, BertModel
from google import genai
from pathlib import Path
import joblib

# ---------------------------------------------------
# CONFIG
# ---------------------------------------------------
GNEWS_API_KEY = os.getenv("GNEWS_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

app = Flask(__name__)
CORS(app)

device = torch.device("cpu")

# ---------------------------------------------------
# LABEL MAP
# ---------------------------------------------------
label_map = {
    0: "World",
    1: "Sports",
    2: "Business",
    3: "Sci/Tech"
}

# ---------------------------------------------------
# PREPROCESS
# ---------------------------------------------------
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text.strip()

# ---------------------------------------------------
# 🤖 LOAD ALL MODELS
# ---------------------------------------------------
from pathlib import Path
import torch
import joblib
from transformers import BertTokenizer, BertForSequenceClassification, BertModel

# Check for device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Loading models...")

# ---------------- BASE DIRECTORY ----------------
# Use resolve() to get the absolute path
base_dir = Path(__file__).resolve().parent / "saved_models"

# ---------------- BERT ----------------
model_path = base_dir / "FineTuned_BERT"

if not model_path.exists():
    raise FileNotFoundError(f"Could not find model directory at {model_path}")

# USE .as_posix() to convert 'C:\...' to 'C:/...' for transformers compatibility
bert_tokenizer = BertTokenizer.from_pretrained(model_path.as_posix(), local_files_only=True)
bert_model = BertForSequenceClassification.from_pretrained(model_path.as_posix(), local_files_only=True)
bert_model.to(device)
bert_model.eval()

# ---------------- BERT BASE ----------------
# Note: This usually requires internet unless already cached locally
bert_base = BertModel.from_pretrained("bert-base-uncased")
bert_base.to(device)
bert_base.eval()

# ---------------- NAIVE BAYES ----------------
nb_bow = joblib.load(base_dir / "NaiveBayes_BoW_model.pkl")
vec_bow = joblib.load(base_dir / "NaiveBayes_BoW_vectorizer.pkl")

nb_tfidf = joblib.load(base_dir / "NaiveBayes_TFIDF_model.pkl")
vec_tfidf = joblib.load(base_dir / "NaiveBayes_TFIDF_vectorizer.pkl")

nb_bert = joblib.load(base_dir / "NaiveBayes_BERT_model.pkl")
scaler_bert = joblib.load(base_dir / "NaiveBayes_BERT_scaler.pkl")

# ---------------- LSTM CLASSES ----------------
class SimpleLSTM(torch.nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.lstm = torch.nn.LSTM(input_dim, 128, batch_first=True)
        self.fc = torch.nn.Linear(128, 4)

    def forward(self, x):
        x = x.unsqueeze(1)
        _, (hn, _) = self.lstm(x)
        return self.fc(hn[-1])

class BertLSTM(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = torch.nn.LSTM(768, 128, batch_first=True)
        self.fc = torch.nn.Linear(128, 4)

    def forward(self, x):
        _, (hn, _) = self.lstm(x)
        return self.fc(hn[-1])

# ---------------- LOAD LSTM WEIGHTS ----------------
bow_dim = vec_bow.transform(["test"]).shape[1]
tfidf_dim = vec_tfidf.transform(["test"]).shape[1]

lstm_bow = SimpleLSTM(bow_dim).to(device)
lstm_bow.load_state_dict(torch.load(base_dir / "LSTM_BoW.pt", map_location=device))
lstm_bow.eval()

lstm_tfidf = SimpleLSTM(tfidf_dim).to(device)
lstm_tfidf.load_state_dict(torch.load(base_dir / "LSTM_TFIDF.pt", map_location=device))
lstm_tfidf.eval()

lstm_bert = BertLSTM().to(device)
lstm_bert.load_state_dict(torch.load(base_dir / "LSTM_BERT.pt", map_location=device))
lstm_bert.eval()

print("✅ All models loaded successfully")

# ---------------------------------------------------
# HELPER: BERT EMBEDDING
# ---------------------------------------------------
def get_bert_embedding(text):
    inputs = bert_tokenizer(text, return_tensors="pt", truncation=True, padding='max_length', max_length=64)
    with torch.no_grad():
        outputs = bert_base(**inputs)
    return outputs.last_hidden_state[:, 0, :].numpy()

# ---------------------------------------------------
# 🔮 MODEL PREDICTIONS
# ---------------------------------------------------
def predict_all_models(text):
    text = preprocess_text(text)
    results = {}

    # NB BoW
    results["NaiveBayes_BoW"] = label_map[int(nb_bow.predict(vec_bow.transform([text]))[0])]

    # NB TFIDF
    results["NaiveBayes_TFIDF"] = label_map[int(nb_tfidf.predict(vec_tfidf.transform([text]))[0])]

    # NB BERT
    emb = get_bert_embedding(text)
    emb = scaler_bert.transform(emb)
    emb = (emb * 1000).astype(int)
    results["NaiveBayes_BERT"] = label_map[int(nb_bert.predict(emb)[0])]

    # LSTM BoW
    X = torch.tensor(vec_bow.transform([text]).toarray(), dtype=torch.float32)
    with torch.no_grad():
        results["LSTM_BoW"] = label_map[int(torch.argmax(lstm_bow(X), dim=1).item())]

    # LSTM TFIDF
    X = torch.tensor(vec_tfidf.transform([text]).toarray(), dtype=torch.float32)
    with torch.no_grad():
        results["LSTM_TFIDF"] = label_map[int(torch.argmax(lstm_tfidf(X), dim=1).item())]

    # LSTM BERT
    emb = np.expand_dims(get_bert_embedding(text), 1)
    X = torch.tensor(emb, dtype=torch.float32)
    with torch.no_grad():
        results["LSTM_BERT"] = label_map[int(torch.argmax(lstm_bert(X), dim=1).item())]

    # Fine-tuned BERT
    inputs = bert_tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        logits = bert_model(**inputs).logits
        results["FineTuned_BERT"] = label_map[int(torch.argmax(logits, dim=1).item())]

    return results

# ---------------------------------------------------
# 📊 PREDICT API
# ---------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    text = data.get("text", "").strip()
    model_name = data.get("model", "ALL")

    if not text:
        return jsonify({"error": "Text required"}), 400

    if model_name == "ALL":
        return jsonify({"results": predict_all_models(text)})

    # Single model selection
    all_results = predict_all_models(text)
    return jsonify({"results": {model_name: all_results.get(model_name)}})

# ---------------------------------------------------
# 📰 CHATBOT (UNCHANGED)
# ---------------------------------------------------
print("Loading embedding model...")
embedder = SentenceTransformer("all-MiniLM-L6-v2")
articles_store = []
index = None

import re

def clean_response(text):
    # remove bold ** **
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)

    # remove bullet points (*, -, etc.)
    text = re.sub(r"^\s*[\*\-\•]\s*", "", text, flags=re.MULTILINE)

    # remove extra spaces
    text = re.sub(r"\n+", "\n", text)

    return text.strip()

def fetch_news():
    base_url = "https://gnews.io/api/v4/search"
    from_date = (datetime.utcnow() - timedelta(days=5)).strftime("%Y-%m-%dT%H:%M:%SZ")
    all_articles = []

    res = requests.get(base_url, params={
        "q": "news",
        "lang": "en",
        "from": from_date,
        "max": 50,
        "apikey": GNEWS_API_KEY
    })

    for a in res.json().get("articles", []):
        text = f"{a.get('title','')} {a.get('description','')}"
        all_articles.append({"embed_text": text, "title": a["title"], "url": a["url"]})

    return all_articles

def build_index():
    global articles_store, index
    articles_store = fetch_news()
    if not articles_store:
        return

    texts = [a["embed_text"] for a in articles_store]
    emb = embedder.encode(texts).astype("float32")
    faiss.normalize_L2(emb)

    index = faiss.IndexFlatIP(emb.shape[1])
    index.add(emb)

build_index()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "")

    q_emb = embedder.encode([question]).astype("float32")
    faiss.normalize_L2(q_emb)

    _, idx = index.search(q_emb, 3)
    context = "\n".join([articles_store[i]["title"] for i in idx[0]])

    prompt = f"Answer based on news:\n{context}\n\nQuestion:{question}"

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    cleaned = clean_response(response.text)

    return jsonify({
        "answer": cleaned
    })

# ---------------------------------------------------
# RUN
# ---------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)