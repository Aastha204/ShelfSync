const Return = require('../Models/Return'); // Import the Return model

// Fetch all returned books
exports.getBookToUser=async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('User ID:', userId);
      const userReturn = await Return.find({ userID: userId }).populate('bookID', 'name author type available').lean(); // Populate book details
      res.json(userReturn);
    } catch (error) {
      console.error('Error fetching user return:', error);
      res.status(500).json({ error: 'Failed to fetch user return' });
    }
  }

