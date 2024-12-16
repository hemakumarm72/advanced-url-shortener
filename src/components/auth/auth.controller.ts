import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../utils/log4';
import * as service from './auth.service';
import { handleResponse } from '../../../middleware/requestHandle';
