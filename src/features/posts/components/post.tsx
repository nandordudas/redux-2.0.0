import { useGetPostQuery } from '~/app/services/post'

interface PostProps extends Entities.Entity {
  id: number
}

export function Post({ id }: PostProps) {
  const { data, error } = useGetPostQuery(id)

  let content: JSX.Element

  if (error) {
    content = (
      <span>
        there was an error
        {' '}
        {JSON.stringify(error)}
      </span>
    )
  }
  else if (!data) {
    content = (
      <span className="loading">
        loading
      </span>
    )
  }
  else {
    content = (
      <div>
        Title:
        {' '}
        <b>
          <span data-testid="post-value">
            {data.name}
          </span>
        </b>
      </div>
    )
  }

  return (
    <div>
      <h2>Post</h2>
      {content}
    </div>
  )
}
