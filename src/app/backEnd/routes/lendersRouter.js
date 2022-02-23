const express = require("express");

function routes(Lender) {
  const lendersRouter = express.Router();

  lendersRouter.route("/lenders")

    .post((req, res) => {
      const lender = new Lender(req.body);
      //console.log(lender);
      lender.save();
      return res.status(201).json(lender);
    })
    .get((req, res) => {
      //  const response = {hello:'this is my api'}
      //  res.json(response);
      const { query } = req;
      Lender.find(query, (err, lenders) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json(lenders);
        }
      });
    });
  lendersRouter.route("/lenders/:lenderId")
    .get((req, res) => {
      Lender.findById(req.params.lenderId, (err, lender) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json(lender);
        }
      });
    })
    .put((req, res) => {
      Lender.findById(req.params.lenderId, (err, lender) => {
        if (err) {
          return res.send(err);
        } else {
          lender.first_name = req.body.first_name;
          lender.last_name = req.body.last_name;
          lender.email = req.body.email;

          lender.save();

          return res.json(lender);
        }
      });
    })
    .delete((req, res) => {
      Lender.findById(req.params.lenderId, (err, lender) => {
        lender.remove((err) => {
          if (err) {
            return res.send(err);
          } else {
            return res.sendStatus(204);
          }
        });
      });
    });

  return lendersRouter;
}

module.exports = routes;
