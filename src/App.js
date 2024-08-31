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
import ListOfBestFictionBooks from './components/listofbestfictionbooks';
import AmazonBestsellersBooks from './components/amazonbestsellersbooks';
import Children from './components/children';
import History from './components/history';
import Fiction from './components/fiction';
import Thriller from './components/thriller';
import Romance from './components/romance';
import Comics from './components/comics';
import BookTrack from './components/bookTrack';
import ReceiptManager from './components/ManageReceipt';
// import LatestCard from './components/latestcard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LibraryManagementTextOverlay/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/aboutuscard" element={<Aboutuscard/>}/>
        <Route path="/booktype" element={<BookType/>}/>
        <Route path="/cards" element={<CardComponent/>}/>
        <Route path="/newrelease" element={<NewRelease/>}/>
        <Route path="/booktrack" element={<BookTrack/>}/>
        <Route path="/receipt" element={<ReceiptManager/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/issue" element={<Issue/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/invoice" element={<Invoice/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/bestauthorbooks" element={<BestAuthorBooks/>}/>
        <Route path="/listofbestfictionbooks" element={<ListOfBestFictionBooks/>}/>
        <Route path="/amazonbestsellersbooks" element={<AmazonBestsellersBooks/>}/>
        <Route path="/children" element={<Children/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/fiction" element={<Fiction/>}/>
        <Route path="/thriller" element={<Thriller/>}/>
        <Route path="/romance" element={<Romance/>}/>
        <Route path="/comics" element={<Comics/>}/>
      </Routes>
    </Router>
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
