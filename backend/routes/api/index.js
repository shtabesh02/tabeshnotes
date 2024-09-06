// backend/routes/api/index.js
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const courseRouter = require('./courses.js');
const lessonRouter = require('./lessons.js');
const commentRouter = require('./comments.js');
const starrednotesRouter = require('./starrednotes.js');
const userprofileRouter = require('./userprofile.js');
const completedRouter = require('./completed.js');
const enrollmentRouter = require('./enrollment.js');
const searchResult = require('./search.js');




router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/courses', courseRouter);
router.use('/lessons', lessonRouter);
router.use('/comments', commentRouter);
router.use('/starrednotes', starrednotesRouter);
router.use('/userprofile', userprofileRouter);
router.use('/completed', completedRouter);
router.use('/enrollment', enrollmentRouter);
router.use('/search', searchResult);





router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  





  // GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});




// GET /api/restore-user
router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);




// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;