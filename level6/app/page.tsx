'use client'

import { useEffect } from "react"

function Page() {
  // ssr
  // const response = await fetch("http://localhost:3000/api/users",{
  //   cache: "no-store"
  // })
  // const data = await response.json()
  // console.log(data)

  // ssg
  // const response = await fetch("http://localhost:3000/api/users",{
  //   cache: "force-cache" //By default
  // })
  // const data = await response.json()
  // console.log(data)

  // isr
  // const response = await fetch("http://localhost:3000/api/users",{
  //   next:{revalidate: 5}
  // })
  // const data = await response.json()
  // console.log(data)

  // ===== Client side rendering =====
  // In ssr only no-store and force-store works, by default is no-store.

  const handleApi = async () => {
    const response = await fetch("/api/users")
  const data = await response.json()
  console.log(data)
  }

  useEffect(() => {
    handleApi()
  },[])

  return (
    <div>page</div>
  )
}

export default Page