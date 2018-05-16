module.exports = (authen, passport) => {
// normal routes ===============================================================

    // show the home page (will also have our login links)
  authen.get('/', function(req, res) {
    res.render('index.ejs')
  })

    // PROFILE SECTION =========================
  authen.get('/profile', isLoggedIn, function(req, res) {
    console.log()
    res.render('profile.ejs', {
      user: req.user
    })
  })

    // LOGOUT ==============================
  authen.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  authen.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') })
  })

  // process the login form
  authen.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (errAuthen, user, info) => {
      if (errAuthen) return next(errAuthen)
      if (info.code !== 100) return res.send(info)
      req.logIn(user, (errLogIn) => {
        if (errLogIn) return next(errLogIn)
        return res.send(info)
      })
    })(req, res, next)
  })

  // SIGNUP =================================
  // show the signup form
  authen.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') })
  })

        // process the signup form
  authen.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))

  // facebook -------------------------------

  // send to facebook to do the authentication
  authen.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }))

  // handle the callback after facebook has authenticated the user
  authen.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }))
// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

  // locally --------------------------------
  authen.get('/connect/local', (req, res) => {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') })
  })
  authen.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }))

  // facebook -------------------------------

  // send to facebook to do the authentication
  authen.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }))

  // handle the callback after facebook has authorized the user
  authen.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }))
// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  authen.get('/unlink/local', isLoggedIn, (req, res) => {
    const user = req.user
    user.local.email = undefined
    user.local.password = undefined
    user.save((err) => {
      res.redirect('/profile')
    })
  })

  // facebook -------------------------------
  authen.get('/unlink/facebook', isLoggedIn, (req, res) => {
    const user = req.user
    user.facebook.token = undefined
    user.save((err) => {
      res.redirect('/profile')
    })
  })
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
