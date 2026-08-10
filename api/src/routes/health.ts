import {Router} from 'express';export const health=Router();health.get('/',(_req,res)=>res.json({success:true,data:{status:'ok',service:'relay-api'}}));health.get('/deep',(_req,res)=>res.json({success:true,data:{status:'ok',checks:{api:true}}}));

