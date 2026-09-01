'use client';

import { FormEvent, useEffect, useState } from 'react';

const models = ['gen4.5', 'gen4_turbo'];
const ratios = [
  { label: 'Landscape 16:9', value: '1280:720' },
  { label: 'Portrait 9:16', value: '720:1280' },
  { label: 'Square 1:1', value: '960:960' },
];

type HistoryItem = { id: string; prompt: string; videoUrl?: string; createdAt: string };

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [model, setModel] = useState('gen4.5');
  const [duration, setDuration] = useState(5);
  const [ratio, setRatio] = useState('1280:720');
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('idle');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem('video-generator-history') || '[]')); } catch {} }, []);
  useEffect(() => {
    if (!taskId || !['PENDING', 'RUNNING'].includes(status)) return;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/generate/${taskId}`); const task = await res.json();
        if (!res.ok) throw new Error(task.error || 'Polling failed');
        setStatus(task.status);
        if (task.status === 'SUCCEEDED' && task.output?.[0]) {
          const url = task.output[0]; setVideoUrl(url);
          const item = { id: taskId, prompt, videoUrl: url, createdAt: new Date().toISOString() };
          setHistory(prev => { const next = [item, ...prev.filter(x => x.id !== taskId)].slice(0, 10); localStorage.setItem('video-generator-history', JSON.stringify(next)); return next; });
        }
        if (task.status === 'FAILED' || task.status === 'CANCELED') setError(task.failure || `Task ${task.status.toLowerCase()}`);
      } catch (e) { setError(e instanceof Error ? e.message : 'Polling failed'); setStatus('error'); }
    }, 5000);
    return () => clearTimeout(timer);
  }, [taskId, status, prompt]);

  async function generate(e: FormEvent) {
    e.preventDefault(); if (!prompt.trim()) return;
    setError(''); setVideoUrl(''); setStatus('creating');
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, imageUrl, model, duration, ratio }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Generation failed');
      setTaskId(data.id); setStatus('PENDING');
    } catch (e) { setError(e instanceof Error ? e.message : 'Generation failed'); setStatus('error'); }
  }

  const busy = ['creating', 'PENDING', 'RUNNING'].includes(status);
  return (
    <main className="shell">
      <section className="card hero">
        <div className="eyebrow">INKWECHAM · VIDEO GENERATOR V1</div><h1>Turn a prompt into a video.</h1>
        <p className="sub">Lean text-to-video and image-to-video generation powered by Runway.</p>
        <form onSubmit={generate}>
          <label>Prompt</label><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="A cinematic shot of a black sports car driving through Johannesburg at night..." rows={5} disabled={busy} />
          <label>Image URL <span>(optional)</span></label><input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." disabled={busy} />
          <div className="grid">
            <div><label>Model</label><select value={model} onChange={e => setModel(e.target.value)} disabled={busy}>{models.map(m => <option key={m}>{m}</option>)}</select></div>
            <div><label>Duration</label><select value={duration} onChange={e => setDuration(Number(e.target.value))} disabled={busy}><option value={5}>5 seconds</option><option value={10}>10 seconds</option></select></div>
            <div><label>Ratio</label><select value={ratio} onChange={e => setRatio(e.target.value)} disabled={busy}>{ratios.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}</select></div>
          </div>
          <button disabled={busy || !prompt.trim()}>{busy ? 'Generating…' : 'Generate video'}</button>
        </form>
        {status !== 'idle' && <div className="status"><strong>Status:</strong> {status}{taskId && <small> · {taskId}</small>}</div>}{error && <div className="error">{error}</div>}
      </section>
      {videoUrl && <section className="card"><h2>Result</h2><video controls playsInline src={videoUrl} /><a className="download" href={videoUrl} target="_blank" rel="noreferrer">Open / download video ↗</a></section>}
      {history.length > 0 && <section className="card"><h2>History</h2>{history.map(item => <div className="history" key={item.id}><div><strong>{item.prompt}</strong><small>{new Date(item.createdAt).toLocaleString()}</small></div>{item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noreferrer">View</a>}</div>)}</section>}
      <footer>V1 · No database · No auth · Provider-hosted output</footer>
      <style jsx global>{`*{box-sizing:border-box}body{margin:0;background:#080808;color:#f5f5f5;font-family:Arial,Helvetica,sans-serif}.shell{max-width:900px;margin:0 auto;padding:32px 18px 60px}.card{background:#111;border:1px solid #292929;border-radius:18px;padding:24px;margin-bottom:18px}.hero{background:linear-gradient(180deg,#151515,#101010)}.eyebrow{font-size:12px;letter-spacing:.16em;color:#aaa;margin-bottom:16px}h1{font-size:clamp(34px,7vw,62px);line-height:1;margin:0 0 12px}h2{margin-top:0}.sub{color:#aaa;margin:0 0 28px}label{display:block;font-size:13px;color:#bbb;margin:16px 0 7px}label span{color:#666}textarea,input,select{width:100%;border:1px solid #333;background:#090909;color:#fff;border-radius:10px;padding:13px;font:inherit}textarea{resize:vertical}.grid{display:grid;grid-template-columns:2fr 1fr 1.5fr;gap:12px}button{margin-top:20px;width:100%;border:0;border-radius:10px;padding:14px;background:#fff;color:#000;font-weight:700;cursor:pointer}button:disabled{opacity:.45;cursor:not-allowed}.status{margin-top:16px;color:#ddd}.status small{color:#666}.error{margin-top:14px;padding:12px;border-radius:10px;background:#2a1111;color:#ffbdbd}video{display:block;width:100%;border-radius:12px;background:#000}.download{display:inline-block;margin-top:12px;color:#fff}.history{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-top:1px solid #292929}.history strong{display:block;font-weight:500}.history small{display:block;color:#777;margin-top:5px}.history a{color:#fff;white-space:nowrap}footer{text-align:center;color:#555;font-size:12px}@media(max-width:700px){.grid{grid-template-columns:1fr}.shell{padding:18px 12px 40px}.card{padding:18px}}`}</style>
    </main>
  );
}
