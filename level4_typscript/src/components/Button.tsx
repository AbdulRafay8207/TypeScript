import React from 'react'

type ButtonProps = {
    data: string,
    page: string,
}

function Button({data, page}:ButtonProps) {
  return (
    <div>
        <h1>From {page} Hello World {data}</h1>
    </div>
  )
}

export default Button