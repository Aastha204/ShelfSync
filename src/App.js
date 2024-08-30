import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import About from './components/About';
<<<<<<< HEAD
import BookType from './components/booktypes';
import NewRelease from './components/newRelease';
import Footer from './components/Footer';
import CardComponent from './components/cards';
=======
import Aboutuscard from './components/aboutusCards';
import BookType from'./components/booktypes'
import Footer from './components/Footer';
import ContactPage from './components/contactUs';
>>>>>>> fb9dbaca10d54139880726f19b87b35836c5d7d7

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
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
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
