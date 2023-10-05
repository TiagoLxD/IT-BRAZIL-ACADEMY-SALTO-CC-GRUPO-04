import { Express } from 'express'
import { bodyParser } from '../middleware/BodyParser'
import { contentType } from '../middleware/ContentType'
import { cors } from '../middleware/Cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
