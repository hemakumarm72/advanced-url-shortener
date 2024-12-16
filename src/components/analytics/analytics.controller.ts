import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../utils/log4';
import * as service from './analytics.service';
import { handleResponse } from '../../../middleware/requestHandle';
