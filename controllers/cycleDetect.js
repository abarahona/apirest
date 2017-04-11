"use strict";

function CycleDetect(main) {

  /**
   * Look for clients
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  function detect(req, res, next) {
    if (req.query.arr.length > 0) {
      main.libs.cycleDetection.detect(req.query.arr)
            .then(cycle => {
              res.json(cycle);
            })
            .catch(err => {
              return next(err);
            });   
    }
  }

  //Public method
	return {
    detect: detect
	};
}

module.exports = CycleDetect;
