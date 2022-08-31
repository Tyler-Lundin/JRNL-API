import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authLoginUser = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) return res.status(400).json({ message: 'User not found' })

  const passwordValid = await bcrypt.compare(password, user.password)
  console.log(passwordValid)
  if (passwordValid) {
    const token = jwt.sign({ userId: user.id, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    })
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    })
  } else {
    res.status(401).json({
      message: 'Invalid credentials',
    })
  }
}

export const authRegisterUser = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).send('Email already in use!')

  if (emailValidator(email) && passwordValidator(password)) {
    const newUser = new User({ email, password })
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(404).json({ msg: 'Error saving password' })
      newUser.email = newUser.email.toLowerCase()
      newUser.password = hash
      const savedUserRes = await newUser.save()
      if (savedUserRes) return res.status(200).json({ msg: `Account for ${newUser.email} created` })
    })
  } else {
    return res.status(400).json({ msg: 'Invalid email or password' })
  }
}

function emailValidator(email) {
  // is a valid email address
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  ) {
    return false
  }
  return email.length > 0 && email.length < 100
}

function passwordValidator(password) {
  // password doesn't contain any special characters except for '.' and '!'
  if (!/^[a-zA-Z0-9!.]+$/.test(password)) {
    return false
  }
  return password.length > 0 && password.length < 20
}
