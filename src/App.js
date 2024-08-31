import LibraryManagementTextOverlay from './components/LibraryManagementTextOverlay';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import About from './components/About';
import BookType from'./components/booktypes'
import Footer from './components/Footer';
import Login from './components/Login';
import Issue from './components/Issue';
import Return from './components/Return';
import Receipt from './components/Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LibraryManagementTextOverlay/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/booktype" element={<BookType/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/issue" element={<Issue/>}/>
        <Route path="/return" element={<Return/>}/>
        <Route path="/receipt" element={<Receipt/>}/>
      </Routes>
    </Router>
  );
}

export default App
