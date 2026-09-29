const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const TOKEN_KEY = 'skillsense_token'
const HAS_ACCOUNT_KEY = 'skillsense_has_account'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
export function hasAccountOnDevice() {
  return localStorage.getItem(HAS_ACCOUNT_KEY) === '1'
}
function markHasAccount() {
  localStorage.setItem(HAS_ACCOUNT_KEY, '1')
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let detail = `Request failed (${res.status})`
    try {
      const data = await res.json()
      if (data?.detail) detail = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(detail)
  }

  if (res.status === 204) return null
  return res.json()
}

// ---- Auth ----
export async function signup(name, email, password) {
  const data = await request('/auth/signup', { method: 'POST', body: { name, email, password }, auth: false })
  setToken(data.access_token)
  markHasAccount()
  return data.user
}

export async function login(email, password) {
  const data = await request('/auth/login', { method: 'POST', body: { email, password }, auth: false })
  setToken(data.access_token)
  markHasAccount()
  return data.user
}

export function getMe() {
  return request('/auth/me')
}

export function setTargetRole(role_key) {
  return request('/auth/me/role', { method: 'PATCH', body: { role_key } })
}

// ---- Roles & questions ----
export function getRoles() {
  return request('/roles')
}

export function getQuestions(role_key) {
  return request(`/assessment/questions?role_key=${encodeURIComponent(role_key)}`)
}

// ---- Assessment ----
export function submitAssessment(role_key, answers) {
  return request('/assessment/submit', { method: 'POST', body: { role_key, answers } })
}

export function getLatestAssessment(role_key) {
  return request(`/assessment/latest?role_key=${encodeURIComponent(role_key)}`)
}

// ---- Progress ----
export function getProgress(role_key) {
  return request(`/progress?role_key=${encodeURIComponent(role_key)}`)
}

// ---- Reports ----
export async function downloadReport(kind, role_key) {
  // kind: 'pdf' | 'excel'
  const token = getToken()
  const res = await fetch(`${API_BASE}/report/${kind}?role_key=${encodeURIComponent(role_key)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error(`Report download failed (${res.status})`)

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const filename = kind === 'pdf' ? 'SkillSense_Performance_Report.pdf' : 'SkillSense_Skill_Matrix.xlsx'
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url)
}

export function getReportJson(role_key) {
  return request(`/report/json?role_key=${encodeURIComponent(role_key)}`)
}
