import express from 'express';
import { StoryCtrl } from '../../controllers';
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/abouts - Get list of abouts */
  .get((req,res,next) => {
    StoryCtrl.list(req,res,next).then(abouts => res.json(abouts))
  })

  /** POST /api/abouts - Create new home */
  .post((req,res,next) => {
    StoryCtrl.create(req,res,next).then(about => res.json(about))
  });

router.route('/:id')
  /** GET /api/abouts/:id - Get home */
  .get((req,res,next) => {
    StoryCtrl.get(req,res,next).then(about => res.json(about))
  })

  /** PUT /api/abouts/:id - Update home */
  .put((req,res,next) => {
    StoryCtrl.update(req,res,next).then(about => res.json(about))
  })

  /** DELETE /api/abouts/:id - Delete home */
  // .delete((req,res,next) => {
  //     StoryCtrl.remove(req,res,next).then(deletedAbout => res.json(deletedAbout))
  // });

/** Load user when API with userId route parameter is hit */
router.param('id', StoryCtrl.load);

export default router;
