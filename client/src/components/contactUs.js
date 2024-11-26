import '../styles/ContactUs.css'; 
import React, { useState , useEffect} from 'react';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaHome, FaArrowAltCircleUp } from 'react-icons/fa';
import { handleError, handleSuccess } from './utils'
import {ToastContainer} from 'react-toastify'
import { FaQuestionCircle } from 'react-icons/fa';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);
    
    const [scrollDirection, setScrollDirection] = useState("down"); // Initial arrow points down
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setScrollDirection("down");
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setScrollDirection("up");
        }
  
        setLastScrollY(currentScrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY]);
  
    const handleScrollClick = () => {
      if (scrollDirection === "down") {
        // Scroll to bottom
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      } else {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
}

      
      const scrollToFAQ = () => {
        const faqSection = document.querySelector('.faq-section');
        if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
     
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const validateName = (name) => {
        if (!name) return "Name is required.";
        if (/\d/.test(name)) return "Name must contain only letters and spaces.";
        if (name.length < 3 || name.length > 15) return "Name length must be between 3 and 15 characters.";
        const regex = /^[a-zA-Z]+(?:[.'-]?[a-zA-Z]+)*(?: [a-zA-Z]+(?:[.'-]?[a-zA-Z]+)*)*$/;
        if (!regex.test(name)) return "Invalid name format.";
        return "";
    };

    const validateEmail = (email) => {
        if (!email) return "Email is required.";
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
        if (!regex.test(email)) return "Email must be a valid email address.";
        return "";
    };

    const validateMessage = (message) => {
        if (!message.trim()) return "Message is required.";
        return "";
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        // Validate all fields and collect errors
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const messageError = validateMessage(message);

        if (nameError || emailError || messageError) {
            // Display all errors at once
            if (nameError) handleError(nameError);
            if (emailError) handleError(emailError);
            if (messageError) handleError(messageError);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                handleSuccess("Your message has been sent successfully!");
                setFormData({ name: '', email: '', message: '' });
            } else {
                handleError("Failed to send the message. Please try again later.");
            }
        } catch (error) {
            console.error('Error:', error);
            handleError("An error occurred. Please try again later.");
        }
    };


    
    return (
        <>
            <div className="contact-page">
                {/* Home Icon */}<div 
                    className="faq-icon" 
                    onClick={scrollToFAQ}
                    title="Go to FAQ Section"
                >
                    <FaQuestionCircle />
                </div>
                <div className="home-icon-contact">
                    <a href="/"><FaHome /></a>
                </div>

                {/* Contact Form Section */}
                <div className="form-container">
                    <h1>Get in touch 🤝</h1>
                    <p>If you have any questions about our services or want to contact us or share your feedback, we'd love to hear from you.</p>
                    <h2><b>Contact Us</b></h2>
                    <form onSubmit={handleSubmit}>
                        <input className='text-black'
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            required 
                            value={formData.name} 
                            onChange={handleInputChange} 
                        />
                        <input className='text-black'
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            required 
                            value={formData.email} 
                            onChange={handleInputChange} 
                        />
                        <textarea className='text-black'
                            name="message" 
                            rows="5" 
                            placeholder="Your Message" 
                            required 
                            value={formData.message} 
                            onChange={handleInputChange} 
                        />
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>

            {/* Colorized section from FAQ till footer */}
            <div className="faq-footer-section">  {/* New div wrapping FAQ and Footer */}

                {/* Enhanced FAQ Heading */}
                <div className="faq-heading-container">
                    <h2 className="faq-heading">Frequently Asked Questions</h2>
                    <p className="faq-subheading">Find answers to the most common queries below and make the most of our services.</p>
                </div>

                {/* FAQ Section */}
                <section className="faq-section">
                    <div className="faq-column">
                        <FAQ
                            imageSrc="https://images5.alphacoders.com/837/837878.jpg"
                            title="How to add a new book?"
                            description="You can add a new book by navigating to the 'Add Book' section in the dashboard."
                        />
                        <FAQ
                            imageSrc="https://cdn.pixabay.com/photo/2020/05/25/17/54/library-5219747_1280.jpg"
                            title="Is my data secure?"
                            description="Yes, all your data is encrypted and secure within our system."
                        />
                        <FAQ
                            imageSrc="https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_640.jpg"
                            title="Can I export my book list?"
                            description="Yes, you can export your book list as a CSV or PDF file from your dashboard."
                        />
                    </div>
                    <div className="faq-column">
                        <FAQ
                            imageSrc="https://cdn.pixabay.com/photo/2014/08/08/21/03/bookshelf-413705_640.jpg"
                            title="How to reset my password?"
                            description="Go to the 'Settings' section and click on 'Reset Password' to start the process."
                        />
                        <FAQ
                            imageSrc="https://cdn.pixabay.com/photo/2017/07/15/22/07/library-2507902_960_720.jpg"
                            title="How to contact support?"
                            description="You can contact support via email or phone, listed in the 'Contact Us' section."
                        />
                        <FAQ
                            imageSrc="https://media.istockphoto.com/id/949118068/photo/books.jpg?s=2048x2048&w=is&k=20&c=84QzSRpNc21wzXu5K7t7z0lSUQ93qIFZOmS84JKdvnI="
                            title="How to delete my account?"
                            description="To delete your account, please go to the 'Settings' section and click on 'Delete Account'."
                        />
                    </div>
                </section>

                {/* Buttons and Footer Section */}
                <div className="contact-buttons-container">
                    <a href="https://wa.me/+918950112002" className="contact-button whatsapp" target="_blank">
                        <FaWhatsapp /> Connect through WhatsApp
                    </a>
                    <a href="tel:+8950112002r" className="contact-button call">
                        <FaPhoneAlt /> Get in Touch
                    </a>
                    <a href="mailto:your-chhabraashita4@gmail.com" className="contact-button email">
                        <FaEnvelope /> Send an Email
                    </a>
                    <a href="https://maps.app.goo.gl/9qJqpfUT99xi55kW9" className="contact-button location" target="_blank">
                        <FaMapMarkedAlt /> Our Location
                    </a>
                </div>
               

                <div className="footer-container">
                    <div className="marquee">
                        <marquee scrollamount="10" behavior="scroll">
                            <b>Contact us here - Contact us here - Contact us here - Contact us here - Contact us here - Contact us here - Contact us here</b>
                        </marquee>
                    </div>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                    <p><b>© ShelfSync All Rights Reserved</b></p>
                </div>
 

            </div> {/* Closing the colorized section div */}
            <ToastContainer/>
        </>
    );
};

const FAQ = ({ imageSrc, title, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = (event) => {
        event.preventDefault(); 
        setIsOpen(!isOpen); 
    };

    return (
        <article>
            <figure>
                <img src={imageSrc} alt={title} />
            </figure>
            <div className="article-body">
                <h2>{title}</h2>
                {isOpen && <p>{description}</p>} 
                <a href="#" onClick={toggleAnswer} className="read-more">
                    {isOpen ? 'Hide' : 'Show'} 
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </article>
    );
};

export default ContactPage;
