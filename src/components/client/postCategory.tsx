import { Chip } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const PostCategory = () => {
  return (
    <div className="flex gap-2">
      <Link href='#'>
        <Chip value="blog tag clicked" className="rounded-full cursor-pointer" />
      </Link>
      <Link href='#'>
        <Chip variant="outlined" value="blog tag" className="rounded-full cursor-pointer text-black" />
      </Link>
    </div>
  )
}

export default PostCategory