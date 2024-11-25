const User = require('../Models/User');
const Book = require('../Models/Book');
const BookIssueModel = require('../Models/Issue');
const Return = require('../Models/Return');

const getMonthName = (monthNumber) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return months[monthNumber - 1];
};

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.aggregate([
        {
          $group: {
            _id: null, // Grouping everything together
            totalAvailableBooks: { $sum: '$available' } // Sum up the available count for each book
          }
        }
      ]);

      const totalAvailableBooks = totalBooks[0] ? totalBooks[0].totalAvailableBooks : 0;
    const totalIssuedBooks = await BookIssueModel.countDocuments({ returned: false });
    const totalReturnedBooks = await BookIssueModel.countDocuments({ returned: true });

    const monthlyIssuedBooks = await BookIssueModel.aggregate([
      {
        $group: {
          _id: { $month: '$issueDate' },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyReturnedBooks = await Return.aggregate([
        {
          $group: {
            _id: { $month: '$returnDate' }, // Group by month
            count: { $sum: 1 }, // Count returned books
          },
        },
      ]);
      
    const booksIssuedByMonth = monthlyIssuedBooks.reduce((acc, item) => {
      const monthName = getMonthName(item._id);
      acc[monthName] = item.count;
      return acc;
    }, {});

    const booksReturnedByMonth = monthlyReturnedBooks.reduce((acc, item) => {
        const monthName = getMonthName(item._id);
        acc[monthName] = item.count;
        return acc;
      }, {});

    res.json({
      totalUsers,
      totalBooks: totalAvailableBooks,
      totalIssuedBooks,
      totalReturnedBooks,
      booksIssuedByMonth,
      booksReturnedByMonth,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

module.exports = { getStatistics };
