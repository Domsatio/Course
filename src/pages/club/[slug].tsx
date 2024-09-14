import { postServices } from '@/services/serviceGenerator'
import { GetPost } from '@/types/post.type'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

const DetailClub: FC = () => {
  const { query: { slug } } = useRouter()
  const [detailPost, setDetailPost] = useState<Omit<GetPost, 'published'> | null>(null)

  useEffect(() => {
    if (!slug) return
    postServices.getItem({ slug }).then(({ data }) => {
      setDetailPost(data)
    })
  }, [slug])

  return (
    <div>DetailClub</div>
  )
}

export default DetailClub