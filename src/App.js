import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import About from './components/About';
import Aboutuscard from './components/aboutusCards';
import BookType from './components/booktypes'
import NewRelease from './components/newRelease';
import CardComponent from './components/cards';
import Footer from './components/Footer';
<<<<<<< HEAD
import Login from './components/Login';
import Issue from './components/Issue';
import Return from './components/Return';
import Receipt from './components/Receipt';
=======
import ContactPage from './components/contactUs';
import BookTrack from './components/bookTrack';
import ReceiptManager from './components/receipt';
// import LatestCard from './components/latestcard';
>>>>>>> 1bd36dd48fb91c9ce3224c916dd58a179e1569cd

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
<<<<<<< HEAD
        <Route path="/login" element={<Login/>}/>
        <Route path="/issue" element={<Issue/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/receipt" element={<Receipt/>}/>
=======
        <Route path="/contact" element={<ContactPage/>}/>
>>>>>>> 1bd36dd48fb91c9ce3224c916dd58a179e1569cd
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
