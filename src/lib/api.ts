const API_BASE = '/api'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }

  return res.json()
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      apiFetch<{ user: any }>('/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password, action: 'login' }),
      }),
    register: (email: string, name: string, password: string) =>
      apiFetch<{ user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      }),
  },
  quiz: {
    categories: () => apiFetch<{ categories: any[] }>('/quiz/categories'),
    questions: (categoryId: string) =>
      apiFetch<{ questions: any[] }>(`/quiz/questions?categoryId=${categoryId}`),
    submit: (data: { userId: string; categoryId: string; answers: { questionId: string; selectedAnswer: string }[] }) =>
      apiFetch<{ attempt: any; results: any[] }>('/quiz/submit', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  ranking: {
    global: () => apiFetch<{ ranking: any[] }>('/quiz/ranking'),
  },
  curiosities: {
    list: (category?: string) =>
      apiFetch<{ curiosities: any[] }>(category ? `/curiosities?category=${category}` : '/curiosities'),
  },
  dashboard: {
    data: () => apiFetch<{
      estabPorTipo: any[]
      estabPorGrupoUH: any[]
      uhLeitosUF: any[]
      capitais: any[]
      estabPorCategoria: any[]
      estabPorCaracteristica: any[]
      estabPorLocalizacao: any[]
    }>('/dashboard/data'),
  },
}
