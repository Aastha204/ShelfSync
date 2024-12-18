import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import About from './components/About';
import Aboutuscard from './components/aboutusCards';
import BookType from './components/booktypes'
import NewRelease from './components/newRelease';
import CardComponent from './components/cards';
import Footer from './components/Footer';
import Login from './components/Login';
import Issue from './components/Issue';
import Return from './components/Return';
import Invoice from './components/Invoice';
import ContactPage from './components/contactUs';
import BestAuthorBooks from './components/bestauthorbooks';
// import ListOfBestFictionBooks from './components/listofbestfictionbooks';
// import AmazonBestsellersBooks from './components/amazonbestsellersbooks';
import Children from './components/children';
import History from './components/history';
import Fiction from './components/fiction';
import Thriller from './components/thriller';
import Romance from './components/romance';
import Comics from './components/comics';
import BookTrack from './components/bookTrack';
import ReceiptManager from './components/ManageReceipt';
import AllBooks from './components/books';
import AdminProfilePage from './components/AdminProfile';
// import LatestCard from './components/latestcard';
import { Navigate } from 'react-router-dom';
import AddBook from './components/AddBook';
import ChangeUserProfile from './components/changeUserProfile';
import Signup from './components/Signup';
import CustomCards from './components/CustomCards';
import AdminLogin from './components/AdminLogin'
import AdminSignup from './components/AdminSignUp'
import BookList from './components/BookList';
import CardsAnimate from "./components/CardsAnimate";
import BestFictionalBooks from './components/BestFictionBook';
import BestSellerBooks from './components/bestSeller';
import BookIssueReceipt from './components/BookIssueReceipt'
import OptionCards from './components/OptionCards';
import Dashboard from './components/Dashboard';
import ReceiptView from './components/ReceiptView';
import DueBooks from './components/DueBooks';
import TermsOfUse from './components/termsofuse';
import PrivacyPolicy from './components/PrivacyPolicy';
import  Receipt from './components/Receipt';
import AllReview from './components/AllReview';
import NotFound from './components/NotFound';
import Review from './components/ReviewCard';
import OTP from './components/OTP';
import LoginViaOTP from './components/LoginViaOTP';
import UpdatePassword from './components/changePassword';
import ProtectedRoute from './components/Protected';
import ProtectedForUser from './components/ProtectedForUser';
import PublicRoute from './components/PublicRoute';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/" />;
// };

function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole"); // Example: "admin" or "user"
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<LibraryManagementTextOverlay/>}/>
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/aboutuscard" element={<Aboutuscard/>}/>
        <Route path="/booktype" element={<BookType/>}/>
        <Route path="/cards" element={<CardComponent/>}/>
        <Route path="/newrelease" element={<NewRelease/>}/>
        <Route path="/booktrack" element={<BookTrack/>}/>
        <Route path="/receipt1" element={<ReceiptManager/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* <Route path='/signup' element={<Signup/>}/> */}
        <Route
          path="/userprofile"
          element={
            <ProtectedForUser>
              <UserProfile />
            </ProtectedForUser>
          }
        />
        <Route path="/issue" element={<Issue/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/invoice" element={<Invoice/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/bestauthorbooks" element={<BestAuthorBooks/>}/>
        {/* <Route path="/listofbestfictionbooks" element={<ListOfBestFictionBooks/>}/> */}
        {/* <Route path="/amazonbestsellersbooks" element={<AmazonBestsellersBooks/>}/> */}
        <Route path="/children" element={<Children/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/fiction" element={<Fiction/>}/>
        <Route path="/thriller" element={<Thriller/>}/>
        <Route path="/romance" element={<Romance/>}/>
        <Route path="/comics" element={<Comics/>}/>
        {/* <Route path="/protected" element={<ProtectedRoute/>}/> */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path='/allreview' element={<AllReview/>}/>
        <Route path='/review' element={<Review/>}/>
        <Route path='/verification' element={<OTP/>}/>
        <Route path='/loginviaotp' element={<LoginViaOTP/>}/>
        <Route path='/changepassword' element={<UpdatePassword/>}/>
        
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={userRole}
            >
              <AdminProfilePage />
            </ProtectedRoute>
             }
             /> */}
        <Route path='/add' element={<AddBook/>}/>
        <Route path='/optioncards' element={<OptionCards/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/books" element={<AllBooks/>}/>
        <Route path="/changeUserProfile" element={<ChangeUserProfile/>}/>
        <Route path="/custom" element={<CustomCards/>}/>
        <Route
          path="/adminlogin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/adminsignup"
          element={
            <PublicRoute>
              <AdminSignup />
            </PublicRoute>
          }
        />
        {/* <Route path="/adminsignup" element={<AdminSignup/>}/> */}
        <Route path='/booklist' element={<BookList/>}/>
        <Route path='/CardsAnimate' element={<CardsAnimate/>}/>
        <Route path='/bestfiction' element={<BestFictionalBooks/>}/>
        <Route path='/bestauthor' element={<BestAuthorBooks/>}/>
        <Route path='/bestseller' element={<BestSellerBooks/>}/>
        <Route path='/receipt' element={<BookIssueReceipt/>}/>
        <Route path="/receipt/:receiptNo" element={<ReceiptView />} />
        <Route path="/due" element={<DueBooks/>}/>
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        <Route path="/invoice/:receiptNo" element={<Receipt/>} />
       
        <Route path="*" element={<NotFound />} />

      </Routes>
    
    </div>
  );
}
// function App() {
//   return (
//     <div>
//       <ContactPage />
//     </div>
//   );
// }

export default App
// import AdminProfilePage from './components/AdminProfile';


// function App() {
//   return (
//     <div>
//       <AdminProfilePage/>
//     </div>
//   );
// }

// export default App
