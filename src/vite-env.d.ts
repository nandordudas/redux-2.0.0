namespace Entities {
  export interface Entity {
    id: number
  }

  export interface Post extends Entity {
    fetchedAt: string
    name: string
  }
}
