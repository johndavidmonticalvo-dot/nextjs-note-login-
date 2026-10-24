# Noted — Next.js Note Application

A responsive note app built with Next.js App Router, React event handling, controlled inputs, and custom form validation. No database or API keys required.

## Run on your laptop

Install Node.js 20.9 or newer. Extract this folder, open it in VS Code, open Terminal → New Terminal, then run:

```sh
npm install
npm run dev
```

Open http://localhost:3000 in your browser. Stop the server with Ctrl+C.

```sh
npm test
npm run build
npm start
```

The final two commands build and serve the production application.

## Assignment requirements

- `/`: login page with controlled email/password inputs and `onChange`.
- `onSubmit` calls `preventDefault()`, validates both fields, and displays errors immediately below the login button.
- Email must be nonempty and a complete address ending exactly in `@gmail.com` (case insensitive). `@gmail.com` by itself is rejected.
- Password must be more than 6 characters (at least 7). The assignment omits its number, so this is an explicit assumption. Change `MIN_PASSWORD_LENGTH` and its message in `lib/validation.mjs` if your teacher specifies another value, and update the hint and test.
- Successful validation uses `router.replace('/notes')`.
- `/notes`: add, view, edit, delete, and search notes. Blank notes and duplicate titles are rejected.
- `onClick` handles editing, deletion, password visibility, and logout.
- Logout removes the demo session and returns to `/`. Opening `/notes` without a demo session returns to login.
- Notes persist by email in this browser using localStorage. The demo session uses sessionStorage. Passwords are never saved.

**Classroom demo only:** This validates input; it does not authenticate a Google account or verify a real password. Browser storage and the route check do not provide secure authentication. Use test credentials, not a real password. Notes are stored only in this browser; they are not synced or protected from others using the same browser.

## Screen recording checklist (about 1–2 minutes)

Use only test credentials such as `student@gmail.com` / `notes123`.

1. Start at `/`. Click **Log in** with both fields empty; show both messages below the button.
2. Try `student@yahoo.com` and `123`; show Gmail and password errors.
3. Try `student@gmail.com` with `123456`; show the length error.
4. Change the password to `notes123`. Log in and show `/notes`.
5. Try adding an empty note, then add a note titled “My first note” with any text.
6. Edit the note and save. Refresh to demonstrate persistence.
7. Search the note, clear the search, delete it, and accept the confirmation.
8. Click **Log out** and show the login screen.
9. Optionally visit `/notes` while logged out to demonstrate the redirect.

On Windows, use Snipping Tool's screen recording, or Win+G → Capture → Start recording (Win+Alt+R). Record only the app window.

## Submit on GitHub

1. Sign in to GitHub. Select **+ → New repository**.
2. Name it `nextjs-noted-login`, choose **Public**, then create the repository.
3. Select **uploading an existing file** (or Add file → Upload files).
4. Upload the **contents** of this extracted project folder, including `app`, `lib`, `scripts`, `tests`, `package.json`, `package-lock.json`, `next.config.mjs`, `README.md`, and `.gitignore`. Keep the folder structure. Do not upload the zip itself, `node_modules`, or `.next`.
5. Commit the files. Submit your repository URL and screen recording.
6. Check that the repository says **Public**. Open the repository link in a private/incognito window to confirm it is viewable.

Alternatively, push this folder with Git:

```sh
git init
git add .
git commit -m "Build Next.js note app with login validation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nextjs-noted-login.git
git push -u origin main
```

## Files to understand

- `app/page.js`: login state and submit handler.
- `lib/validation.mjs`: reusable email and password validation.
- `app/notes/page.js`: notes, persistence, session check, and logout.
- `app/globals.css`: responsive design.
- `app/layout.js`: shared page layout and metadata.

Reference: https://nextjs.org/docs/app/api-reference/functions/use-router

## Verification

Validation tests: 4 passed. Production build: passed for `/` and `/notes`. Full browser interaction testing was unavailable in the preview environment; follow the recording checklist to verify the login, note actions, and logout on your laptop.
