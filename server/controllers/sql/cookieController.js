const controller = {};
/////////
controller.setSSIDCookie = (req, res, next) => {
  pool.query(
    'SELECT * FROM Todos WHERE uname=$1;',
    [req.params.uname],
    (error, result) => {
      if (error) console.log(error);
      res.locals.result = result.rows;
      next();
    }
  );
};

// controller.signup({ body: { uname: 'bob', pw: 'dole' } });

module.exports = controller;
