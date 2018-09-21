import express from 'express';
import { CsvCtrl } from '../../controllers';
const router = express.Router(); // eslint-disable-line new-cap
import fs from 'fs'

router.route('/')
  /** GET /api/abouts - Get list of abouts */
  .get(async (req,res,next) => {
    CsvCtrl.get(req,res,next)  
    // res.set('Content-Type', 'text/csv');
    // return fs.writeFile('./output.csv',data, (err) => {
    //   if (err) {
    //       console.log(err);
    //   }
    //   else {
    //       console.log('wrote output.csv');
    //   }
    // });  
    

  })
  .post(async (req,res,next) => {
     await CsvCtrl.post(req,res,next);
     res.download('./output.csv')
     //res.set('Content-Type', 'text/csv');
     //res.setHeader('Content-disposition', 'attachment; filename=output.csv');
     //console.log('downloading')
     //return res.download('./output.csv')
  })

export default router;
