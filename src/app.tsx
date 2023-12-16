import { Counter } from './features/counter/components/counter'

import './app.css'
import { Post } from './features/posts/components/post'

export function App() {
  return (
    <div>
      <Counter />
      <Post id={1} />
    </div>
  )
}
