// eSIMGO APIクライアント雛形
interface ImportMetaEnv {
  VITE_ESIM_BASE: string;
  VITE_ESIM_TOKEN: string;
}

declare interface ImportMeta {
  env: ImportMetaEnv;
}

export async function issueEsim(params: any) {
  // params例: { planId, email, device }
  const res = await fetch(`${ESIM_BASE}/api/v1/esim/issue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ESIM_TOKEN}`
    },
    body: JSON.stringify(params)
  });
  return res.json();
} 