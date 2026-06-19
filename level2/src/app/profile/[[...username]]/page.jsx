import React from 'react'

async function page({params}) {
  const data = await params
  console.log(data)
  return (
    <div>Ola {data.username && (data.username.map((u,index) => (<p key={index}>{u}</p>)))}</div>
  )
}

export default page