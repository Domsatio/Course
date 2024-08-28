import { createPost, deletePost, getPost, getPosts, updatePost } from '@/controllers/post.controller'
import { createPostValidation, updatePostValidation } from '@/validations/post.validation';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req })

  if (req.method === 'POST') {
    if (!token || token.role !== 'admin') {
      res.status(401).json({ message: "Forbidden" })
      return
    }

    req.body.id = uuidv4()

    const { validatedData, errors } = createPostValidation(req.body)

    if (errors) {
      console.error('ERR: post - create = ', errors)
      return res.status(422).send({ status: false, statusCode: 422, message: errors })
    }

    try {
      await createPost(validatedData)
      console.info("Create post success")
      return res.status(201).send({ status: true, statusCode: 201, message: "Create post success" })
    } catch (error) {
      console.error("ERR: post - create = ", error)
      return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
  } else if (req.method === 'PUT') {
    if (!token || token.role !== 'admin') {
      res.status(401).json({ message: "Forbidden" })
      return
    }

    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: "Invalid id parameter" })
    }

    const { validatedData, errors } = updatePostValidation(req.body)

    if (errors) {
      console.error("ERR: post - update = ", errors)
      return res.status(422).send({ status: false, statusCode: 422, message: errors })
    }

    try {
      const result = await updatePost(id, validatedData)

      if (result) {
        console.log("update post success")
        return res.status(201).send({ status: true, statusCode: 201, message: "Update post success" })
      } else {
        console.log("Data not found")
        return res.status(404).send({ status: false, statusCode: 404, message: "Data not found" })
      }
    } catch (error) {
      console.error("ERR: post update = ", error)
      return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
  } else if (req.method === 'DELETE') {
    if (!token || token.role !== 'admin') {
      res.status(401).json({ message: "Forbidden" })
      return
    }

    const { id } = req.query

    if (typeof id !== 'string') {
      return res.status(400).json({ message: "Invalid id parameter" })
    }

    try {
      const result = await deletePost(id)

      if (result) {
        console.log("Delete post success")
        return res.status(200).send({ status: true, statusCode: 200, message: "Delete post success" })
      } else {
        console.log("Data not found")
        return res.status(404).send({ status: false, statusCode: 404, message: "Data not found" })
      }
    } catch (error) {
      console.error("ERR: post - delete = ", error)
      return res.status(422).send({ status: false, statusCode: 422, message: error })
    }
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const { id } = req.query

      if (typeof id !== 'string') {
        return res.status(400).json({ message: "Invalid id parameter" })
      }

      try {
        const data = await getPost(id)
        console.info("Get post success")
        return res.status(200).send({ status: true, statusCode: 200, message: "Get post success", data })
      } catch (error) {
        console.error("ERR: post - get = ", error)
        return res.status(422).send({ status: false, statusCode: 422, message: error })
      }
    } else {
      try {
        const data = await getPosts()
        console.info("Get posts success")
        return res.status(200).send({ status: true, statusCode: 200, message: "Get posts success", data })
      } catch (error) {
        console.error("ERR: posts - get = ", error)
        return res.status(422).send({ status: false, statusCode: 422, message: error })
      }
    }
  } else {
    res.status(405).end()
  }
}
