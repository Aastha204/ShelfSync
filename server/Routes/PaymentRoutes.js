const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Book = require("../Models/Book"); 
const Issue = require("../Models/Issue"); 

router.post("/orders", async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);

    if (!book || book.available <= 0) {
      return res.status(400).json({ message: "Book is unavailable for issue" });
    }

    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: book.ratePerMonth * 100, // Convert to smallest currency unit
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
      }
      res.status(200).json({ order, book });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
	try {
	  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookId, userId } = req.body;
  
	  console.log("Received verify request:", req.body);
  
	  // Check if bookId and userId are present
	  if (!bookId || !userId) {
		console.error("Missing bookId or userId:", { bookId, userId });
		return res.status(400).json({ message: "bookId and userId are required" });
	  }
  
	  const sign = razorpay_order_id + "|" + razorpay_payment_id;
	  const expectedSign = crypto
		.createHmac("sha256", process.env.KEY_SECRET)
		.update(sign)
		.digest("hex");
  
	  console.log("Expected Signature:", expectedSign);
	  console.log("Provided Signature:", razorpay_signature);
  
	  if (razorpay_signature === expectedSign) {
		const book = await Book.findById(bookId);
  
		console.log("Payment verified and book issued successfully");
		return res.status(200).json({ message: "Payment verified"});
	  } else {
		console.error("Signature mismatch");
		return res.status(400).json({ message: "Invalid signature sent!" });
	  }
	} catch (error) {
	  console.error("Error in /verify route:", error);
	  res.status(500).json({ message: "Internal Server Error" });
	}
  });

  router.post("/payfine", async (req, res) => {
	try {
	  const { IssueId, fine } = req.body;
	  console.log(req.body);
  
	  // Check if fine is provided in the request body
	  if (!fine) {
		console.error("Fine is missing");
		return res.status(400).json({ message: "Fine amount is required" });
	  }
	  
	  if (!IssueId) {
		console.error("IssueId is missing");
		return res.status(400).json({ message: "IssueId is required" });
	  }
	  
  
	  // Fetch the issue document based on IssueId
	  const issue = await Issue.findById(IssueId);
	  if (!issue) {
		console.log("Issue not found");
		return res.status(404).json({ message: "Issue not found" });
	  }
  
	  // Fetch the corresponding book using the bookID from the issue
	  const book = await Book.findById(issue.bookID);
	  if (!book) {
		console.log("book not found");
		return res.status(404).json({ message: "Book not found" });
	  }
  
	  // Razorpay payment instance
	  const instance = new Razorpay({
		key_id: process.env.KEY_ID,
		key_secret: process.env.KEY_SECRET,
	  });
  
	  const options = {
		amount: fine * 100, // Convert fine to smallest currency unit
		currency: "INR",
		receipt: crypto.randomBytes(10).toString("hex"),
	  };
  
	  instance.orders.create(options, (error, order) => {
		if (error) {
		  console.log(error);
		  return res.status(500).json({ message: "Something went wrong!" });
		}
		res.status(200).json({ order, book });
	  });
	} catch (error) {
	  console.error("Error processing payment:", error);
	  res.status(500).json({ message: "Internal Server Error!" });
	}
  });
  
  
  router.post("/verifyfine", async (req, res) => {
	  try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, IssueId } = req.body;
	
		console.log("Received verify request:", req.body);
	
		// Check if bookId and userId are present
		if (!IssueId) {
		  console.error("Missing bookId or userId:", { IssueId});
		  return res.status(400).json({ message: "IssueId are required" });
		}
	
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
		  .createHmac("sha256", process.env.KEY_SECRET)
		  .update(sign)
		  .digest("hex");
	
		console.log("Expected Signature:", expectedSign);
		console.log("Provided Signature:", razorpay_signature);
	
		if (razorpay_signature === expectedSign) {
	
		  console.log("Payment verified and book returned successfully");
		  return res.status(200).json({ message: "Payment verified"});
		} else {
		  console.error("Signature mismatch");
		  return res.status(400).json({ message: "Invalid signature sent!" });
		}
	  } catch (error) {
		console.error("Error in /verify route:", error);
		res.status(500).json({ message: "Internal Server Error" });
	  }
	});
  

module.exports = router;
