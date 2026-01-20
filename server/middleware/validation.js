import { body } from "express-validator";

export const validateSignUp = [
  body('name')
    .isString()
    .trim()
    .notEmpty().withMessage('Username is required').bail()
    .matches(/^[\w\s-]+$/).withMessage('Username must contain only letters, numbers, spaces, underscores, or hyphens'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Invalid email format').bail()
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirm')
    .trim()
    .notEmpty().withMessage('Please confirm your password').bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
];

export const validateComment = [
  body('content')
    .notEmpty().withMessage('Content is missing')
    .isString()
    .trim()
    .bail()
    .isLength({ max: 200 }),
];

export const validateBlog = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isString(),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isString(),
  body('published')
    .isBoolean({ loose: false }).withMessage('Published must be a boolean')
    .notEmpty().withMessage('Published is required'),
]