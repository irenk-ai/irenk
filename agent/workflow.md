# Workflow Implementasi AI Chatbot Lokal

Panduan langkah demi langkah untuk membangun aplikasi chatbot AI lokal menggunakan:

- **LLM:** Ollama + Qwen 2.5
- **Backend:** Express.js
- **Database:** MongoDB + Mongoose
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS + Shadcn UI

---

# Tahap 1: Persiapan Infrastruktur & Konfigurasi

## 1. Struktur Proyek

Pisahkan proyek menjadi dua bagian:

```text
project-root/
│
├── backend/
│
└── frontend/
```

---

## 2. Inisialisasi Node.js

Masuk ke masing-masing folder dan jalankan:

```bash
npm init -y
```

Struktur:

```text
project-root/
│
├── backend/
│   └── package.json
│
└── frontend/
    └── package.json
```

---

## 3. Konfigurasi Environment Variable (Backend)

Buat file:

```text
backend/.env
```

Isi:

```env
MONGOSI=mongodb://localhost:27017/chatbot_db
```

Variabel ini digunakan untuk menyimpan konfigurasi koneksi database secara aman.

---

## 4. Menjalankan Model AI

Pastikan Ollama sudah aktif.

Jalankan:

```bash
ollama run qwen2.5:0.5b
```

Model akan tersedia melalui:

```text
http://localhost:11434
```

---

# Tahap 2: Membangun Backend API (Express.js)

## 1. Instalasi Dependensi

Masuk ke folder backend:

```bash
cd backend
```

Install package:

```bash
npm install express mongoose cors dotenv
```

---

## 2. Setup Server Dasar

Buat file:

```text
backend/index.js
```

Tugas utama:

- Memuat konfigurasi `.env`
- Mengaktifkan CORS
- Menjalankan Express
- Menentukan port server (misalnya port 3000)

---

## 3. Koneksi MongoDB

Buat file:

```text
backend/db.js
```

Gunakan Mongoose untuk melakukan koneksi ke:

```javascript
process.env.MONGOSI
```

---

## 4. Pembuatan Schema Database

Buat:

```text
backend/models/Chat.js
```

Schema yang disimpan:

| Field | Tipe |
|---------|-----|
| sessionId | String |
| userMessage | String |
| aiResponse | String |

Contoh struktur data:

```json
{
  "sessionId": "12345",
  "userMessage": "Halo",
  "aiResponse": "Halo, ada yang bisa saya bantu?"
}
```

---

## 5. Endpoint Chat

Buat endpoint:

```http
POST /api/chat
```

### Alur Endpoint

#### 1. Menerima pesan pengguna

Request:

```json
{
  "sessionId": "12345",
  "message": "Apa itu JavaScript?"
}
```

↓

#### 2. Mengambil riwayat percakapan

Dari MongoDB berdasarkan:

```text
sessionId
```

↓

#### 3. Mengirim prompt ke Ollama

Request ke:

```text
http://localhost:11434/api/generate
```

Dengan isi:

- Riwayat chat
- Pesan terbaru pengguna

↓

#### 4. Ollama menghasilkan jawaban

Contoh:

```text
JavaScript adalah bahasa pemrograman yang digunakan untuk membuat aplikasi web interaktif.
```

↓

#### 5. Menyimpan percakapan ke MongoDB

Data yang disimpan:

```json
{
  "sessionId": "12345",
  "userMessage": "Apa itu JavaScript?",
  "aiResponse": "JavaScript adalah bahasa pemrograman..."
}
```

↓

#### 6. Mengirim respons ke frontend

Response:

```json
{
  "response": "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat aplikasi web interaktif."
}
```

---

# Tahap 3: Membangun Frontend

## 1. Membuat Project React dengan Vite

Masuk ke folder frontend:

```bash
npm create vite@latest
```

Pilih:

```text
React
JavaScript
```

---

## 2. Instalasi Tailwind CSS

Install Tailwind:

```bash
npm install tailwindcss @tailwindcss/vite
```

Konfigurasi Tailwind agar dapat digunakan untuk:

- Layout
- Responsive design
- Utility class

---

## 3. Integrasi Shadcn UI

Install komponen yang diperlukan.

Komponen utama:

### Card

Digunakan sebagai container area chat.

### Input

Digunakan untuk mengetik pesan.

### Button

Digunakan untuk mengirim pesan.

---

## 4. Komunikasi dengan Backend

Buat fungsi asynchronous menggunakan:

- `fetch()`
- atau `axios`

Request ke:

```text
http://localhost:3000/api/chat
```

Contoh body:

```json
{
  "sessionId": "12345",
  "message": "Halo AI"
}
```

Response:

```json
{
  "response": "Halo juga!"
}
```

---

## 5. State Management

Gunakan:

```javascript
useState()
```

Untuk menyimpan daftar pesan.

Contoh struktur:

```javascript
[
  {
    role: "user",
    content: "Halo"
  },
  {
    role: "assistant",
    content: "Halo juga!"
  }
]
```

Pesan kemudian ditampilkan secara bergantian pada UI.

---

# Tahap 4: Pengujian dan Penyempurnaan

## 1. Uji End-to-End

Jalankan:

### Backend

```bash
npm start
```

### Frontend

```bash
npm run dev
```

Lakukan percakapan dan pastikan:

- Respons AI muncul.
- Data tersimpan di MongoDB.
- Session chat berjalan dengan benar.

---

## 2. State Loading

Saat menunggu respons Ollama, tampilkan indikator seperti:

```text
AI sedang mengetik...
```

Atau:

- Spinner
- Skeleton loading
- Animasi dots

Contoh:

```text
User
↓
Mengirim pesan
↓
Loading...
↓
Respons AI muncul
```

---

## 3. Error Handling

Gunakan:

```javascript
try {
    ...
}
catch(error){
    ...
}
```

Untuk mengantisipasi kondisi:

### Ollama tidak aktif

```text
Connection refused
```

### MongoDB terputus

```text
Database connection failed
```

### Backend error

```text
Internal Server Error
```

Frontend sebaiknya menampilkan pesan:

```text
Terjadi kesalahan, silakan coba lagi.
```

---

# Arsitektur Keseluruhan

```text
User
 │
 ▼
Frontend (React + Tailwind + Shadcn)
 │
 ▼
Backend API (Express.js)
 │
 ├── MongoDB
 │      ▲
 │      │
 │  Riwayat Chat
 │
 ▼
Ollama API
(Qwen2.5:0.5b)
 │
 ▼
AI Response
 │
 ▼
Frontend
```

---

# Teknologi yang Digunakan

| Layer | Teknologi |
|---------|---------|
| LLM | Ollama + Qwen2.5 |
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| UI Component | Shadcn UI |
| HTTP Client | Fetch API / Axios |
| State Management | React useState |
