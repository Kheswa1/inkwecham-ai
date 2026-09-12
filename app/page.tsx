'use client';

import { useState } from 'react';

export default function Home() {
  const [request, setRequest] = useState('');
  const steps = ['Understand','Verify','Reason','Coordinate','Decide','Execute','Report'];
  const submit = () => { if (!request.trim()) return; window.alert('KHESH boundary is ready. Authentication and the authorized SYSTEM adapter must be configured before execution.'); };
  return <main className='page'><nav className='nav'><div className='brand'>INKWECHAM</div><div className='status'>KHESH • VERIFIED-FIRST</div></nav><section className='hero'><div className='eyebrow'>Move Without Limits</div><h1>Business intelligence that knows the difference between fact and assumption.</h1><p>KHESH is the intelligence and execution layer for IC AI CITY. It verifies reality before execution and refuses to present generated or demo data as authoritative.</p><div className='workspace'><article className='panel'><h2>KHESH execution boundary</h2><div className='flow'>{steps.map((step) => <span className='step' key={step}>{step}</span>)}</div><p className='evidence'>Authoritative evidence must come from an authorized system adapter. If the adapter is unavailable or evidence is not authoritative, execution fails closed.</p></article><article className='panel'><h2>AI Workspace</h2><p className='evidence'>Submit a request to enter the KHESH pipeline. No execution is claimed until identity, authorization and authoritative evidence are available.</p><div className='composer'><input aria-label='KHESH request' value={request} onChange={(event) => setRequest(event.target.value)} placeholder='Ask KHESH what needs to happen…' /><button type='button' onClick={submit}>Send</button></div></article></div></section></main>;
}