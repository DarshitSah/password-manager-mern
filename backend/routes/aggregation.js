const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $addFields: {
          marksRange: {
            $switch: {
              branches: [
                { case: { $lte: ['$marks', 40] }, then: "0-40" },
                { case: { $lte: ['$marks', 70] }, then: "41-70" }
              ],
              default: "71-100"
            }
          }
        }
      },
      {
        $group: {
          _id: "$marksRange",
          count: { $sum: 1 },
          students: {
            $push: {
              name: "$name",
              regNo: "$regNo",
              marks: "$marks"
            }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;