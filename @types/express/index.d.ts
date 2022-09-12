import { IsJrnl } from 'models/jrnl.model'
import { IsLib } from 'models/lib.model'
import { IsPage } from 'models/page.model'
import { IUser } from '../../src/models/user.model'

// src/middleware/authToken.ts adds the user to the request object

declare global {
  namespace Express {
    interface Request {
      user?: Partial<IUser>
      jrnl?: Partial<IsJrnl>
      userID?: string
      jrnlID?: string
    }
  }
}
