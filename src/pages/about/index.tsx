import ContentWrapper from '@/layouts/client/contentWrapper'
import { Typography } from '@material-tailwind/react'
import React from 'react'

const ClientAboutPage = () => {
  return (
    <ContentWrapper>
      <Typography variant='h2' className='text-center mt-10 px-32'>
        &quot;You miss 100% of the shots you don&apos;t take.&quot;
      </Typography>
      <Typography variant='paragraph' className='px-72 text-center'>
        - Wayne Gretzky
      </Typography>
      <Typography variant='paragraph' className='px-72 mt-20'>
        I’m a full-stack developer with a passion for building innovative web applications and exploring the latest trends in technology. My journey into coding started about six years ago, and ever since, I’ve been captivated by the power of programming to create real-world solutions. Through this blog, I share my experiences, insights, and the lessons I’ve learned while working on various tech projects.
        <br />
        Professionally, I’ve had the opportunity to work with startups and established companies, helping them design and develop scalable web platforms. Some of my favorite projects include a task management tool for remote teams and an e-commerce app that streamlined customer experiences. I love tackling complex problems, and
        <br />
        I’m constantly experimenting with new frameworks and tools to stay at the cutting edge of the tech world.
        When I’m not coding or writing about technology, you can usually find me outdoors, hiking, or exploring new coffee shops in search of the perfect brew. I’m also a big fan of reading sci-fi novels and diving into the latest video games when I need a break from the screen.
        <br />
        Thanks for visiting my blog! Whether you’re here for coding tips, project updates, or just to geek out over the latest tech trends, I hope you find something that resonates with you. Feel free to drop a comment or connect with me on social media—I’d love to hear from you!
      </Typography>
    </ContentWrapper>
  )
}

export default ClientAboutPage
