'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [notes, setNotes] = useState([]);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [storageError, setStorageError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    try {
      const email = sessionStorage.getItem('noted-user');
      if (!email) { router.replace('/'); return; }
      setUser(email);
      const saved = JSON.parse(localStorage.getItem(`noted-notes:${email}`) || '[]');
      if (!Array.isArray(saved) || saved.some(n => !n || typeof n.id !== 'string' || typeof n.title !== 'string' || typeof n.body !== 'string')) throw new Error('Invalid notes');
      setNotes(saved);
      setReady(true);
    } catch {
      setStorageError('Your saved notes could not be loaded. Check browser storage, then reload.');
    }
  }, [router]);

  useEffect(() => {
    if (!ready || !user) return;
    try { localStorage.setItem(`noted-notes:${user}`, JSON.stringify(notes)); setStorageError(''); }
    catch { setStorageError('Changes could not be saved. Browser storage may be full or disabled.'); }
  }, [notes, ready, user]);

  function clearForm() { setTitle(''); setBody(''); setEditingId(null); setError(''); }
  function saveNote(event) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) { setError('Give your note a title and some text.'); return; }
    if (notes.some(n => n.id !== editingId && n.title.toLowerCase() === title.trim().toLowerCase())) { setError('A note with this title already exists. Choose another title.'); return; }
    const note = { id: editingId || crypto.randomUUID(), title: title.trim(), body: body.trim(), updatedAt: new Date().toISOString() };
    setNotes(previous => editingId ? previous.map(n => n.id === editingId ? note : n) : [note, ...previous]);
    setStatus(editingId ? 'Note updated.' : 'Note added.');
    clearForm();
  }
  function logout() {
    try { sessionStorage.removeItem('noted-user'); router.replace('/'); }
    catch { setStorageError('Unable to log out. Check browser storage and try again.'); }
  }
  const visibleNotes = notes.filter(n => `${n.title} ${n.body}`.toLowerCase().includes(search.toLowerCase()));

  if (!ready) return <main className="loading"><p>{storageError || 'Opening your thinking space…'}</p><a href="/">Return to login</a></main>;

  return <div className="workspace"><header className="topbar"><a className="brand" href="/notes"><span className="brand-icon">n.</span> noted</a><div className="account"><span>{user}</span><button className="secondary" onClick={logout}>Log out ↗</button></div></header>
    <main className="notes-main"><div className="workspace-heading"><div><p className="eyebrow">A LITTLE MORE CLARITY</p><h1>Your thoughts,<br /><em>all together.</em></h1><p className="muted">A home for the things you don’t want to forget.</p></div><div className="note-count"><strong>{String(notes.length).padStart(2, '0')}</strong><span>{notes.length === 1 ? 'NOTE COLLECTED' : 'NOTES COLLECTED'}</span></div></div>
      {storageError && <p className="error-banner" role="alert">{storageError}</p>}
      <div className="notes-layout"><aside className="composer"><div className="section-label"><span>{editingId ? 'EDIT YOUR NOTE' : 'START SOMETHING'}</span><span>✦</span></div><h2>{editingId ? 'A second thought.' : 'What’s on your mind?'}</h2><form onSubmit={saveNote} noValidate><label htmlFor="title">Title</label><input id="title" value={title} maxLength={100} onChange={e => setTitle(e.target.value)} placeholder="Give your thought a name" required aria-describedby={error ? 'note-error' : undefined} /><label htmlFor="body">Your note</label><textarea id="body" rows={7} value={body} maxLength={5000} onChange={e => setBody(e.target.value)} placeholder="Let your ideas out…" required aria-describedby={error ? 'note-error' : undefined} /><button className="primary" type="submit">{editingId ? 'Save changes' : 'Add note'} <span>＋</span></button>{editingId && <button className="text-button" type="button" onClick={clearForm}>Cancel editing</button>}<p id="note-error" className="form-error" role={error ? 'alert' : undefined}>{error}</p></form><p className="autosave">◉ &nbsp; Saved in this browser</p></aside>
      <section className="collection" aria-label="Saved notes"><div className="collection-toolbar"><h2>My notes <span>({notes.length})</span></h2><label className="sr-only" htmlFor="search">Search notes</label><input id="search" type="search" placeholder="Search your thoughts…" value={search} onChange={e => setSearch(e.target.value)} /></div><p className="sr-only" role="status">{status}</p>
      {visibleNotes.length === 0 ? <div className="empty-state"><span>✧</span><h3>{search ? 'No matching thoughts.' : 'Your next idea starts here.'}</h3><p>{search ? 'Try a different word.' : 'Write your first note. Give it a place to grow.'}</p></div> : <div className="notes-grid">{visibleNotes.map((note, index) => <article className={`note-card color-${index % 3}`} key={note.id}><div className="note-meta"><span>THOUGHT {String(index + 1).padStart(2, '0')}</span><span>↗</span></div><h3>{note.title}</h3><p className="note-body">{note.body}</p><footer><span>{new Date(note.updatedAt).toLocaleDateString('en-US', {month:'short', day:'numeric'})}</span><div><button onClick={() => {setEditingId(note.id); setTitle(note.title); setBody(note.body); setError(''); document.getElementById('title')?.focus();}} aria-label={`Edit ${note.title}`}>Edit</button><button onClick={() => {if (!window.confirm(`Delete “${note.title}”?`)) return; setNotes(previous => previous.filter(n => n.id !== note.id)); if (editingId === note.id) clearForm(); setStatus('Note deleted.');}} aria-label={`Delete ${note.title}`}>Delete</button></div></footer></article>)}</div>}
      </section></div><footer className="workspace-footer">A clear mind. A fresh page. <span>MADE FOR YOUR EVERYDAY IDEAS</span></footer>
    </main></div>;
}
