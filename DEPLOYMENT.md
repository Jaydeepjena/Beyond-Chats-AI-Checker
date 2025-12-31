# Deployment Guide (The "Easy" Way)

Since your project uses **SQLite** (a file-based database), deploying the backend to free cloud hosting (like Heroku, Vercel, or Render) is difficult because they often **delete database files** when the server restarts or sleeps.

For an assignment submission, the best approach is:
1.  **Backend**: Run locally and expose it via a **Tunnel** (using ngrok).
2.  **Frontend**: Deploy properly to **Netlify** or **Vercel**.

---

## Part 1: Expose Backend (Live URL)

We will use **ngrok** to give your local Laravel server a public URL (e.g., `https://random-name.ngrok-free.app`).

1.  **Download ngrok**: [https://ngrok.com/download](https://ngrok.com/download) (or use `choco install ngrok` if you have chocolatey).
    *   *Alternative*: If you have Node.js, you can try `npx localtunnel --port 8000` (skip login), but ngrok is more stable.
2.  **Start your Backend**:
    ```powershell
    cd backend_core
    php artisan serve
    ```
3.  **Start the Tunnel** (New Terminal):
    ```powershell
    ngrok http 8000
    ```
4.  **Copy the Forwarding URL**: content usually looks like `https://xxxx-xxxx.ngrok-free.app`.
    *   **Keep this terminal open!** If you close it, the link dies.

---

## Part 2: Update Frontend to use Live Backend

Now that you have a live backend URL, tell the React app to use it.

1.  Open `frontend/src/components/ArticleList.jsx` and `ArticleDetail.jsx`.
2.  Find `http://127.0.0.1:8000/api/articles`.
3.  Replace it with your new Ngrok URL (e.g., `https://xxxx.ngrok-free.app/api/articles`).
    *   *Tip: Don't forget the `/api/articles` part!*
4.  Save the files.

---

## Part 3: Deploy Frontend (Vercel/Netlify)

1.  **Build the Frontend**:
    ```powershell
    cd frontend
    npm run build
    ```
    This creates a `dist` folder.

2.  **Deploy to Netlify (Drag & Drop)**:
    *   Go to [app.netlify.com](https://app.netlify.com) (Sign up/Login).
    *   Go to "Sites" -> "Add new site" -> "Deploy manually".
    *   **Drag and drop** the `frontend/dist` folder onto the page.
    *   **Done!** Netlify will give you a link like `https://syam-project.netlify.app`.

---

## Part 4: Final Verification

1.  Open your **Netlify Link** (e.g., `https://syam-project.netlify.app`) on your phone or another computer.
2.  Also keep your **PC turned on** with `php artisan serve` and `ngrok` running.
3.  The site should load articles from your local PC via the tunnel!