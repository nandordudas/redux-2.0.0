import { Counter } from '~/features/counter/components/counter'
import { Post } from '~/features/posts/components/post'

import '~/app.css'

export function App() {
  return (
    <div>
      <Counter />
      <Post id={1} />
    </div>
  )
}
