import rateLimit from 'express-rate-limit';import {config} from '../config';export const generalLimiter=rateLimit({windowMs:config.RATE_LIMIT_WINDOW_MS,max:config.RATE_LIMIT_MAX,standardHeaders:true,legacyHeaders:false});export const authLimiter=rateLimit({windowMs:900000,max:10,standardHeaders:true,legacyHeaders:false});

