import { Request, Response } from 'express';
import db from '../config/database';
import { UpdateUserInput,UserParams} from '../validations/userValidation';
import { verifyToken } from '../utils/jwt';