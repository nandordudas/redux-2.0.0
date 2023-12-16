export type LoadingState = 'idle' | 'loading' | 'failed'

export interface Entity {
  id: number
}

export interface Post extends Entity {
  fetched_at: string
  name: string
}
