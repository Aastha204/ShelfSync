import '../styles/ContactUs.css'; 
import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt,FaHome,FaArrowAltCircleUp} from 'react-icons/fa';

const ContactPage = () => {
    return (
        <>
            <div className="contact-page">
                {/* Home Icon */}
                <div className="home-icon">
                    <a href="/"><FaHome/></a>
                </div>
                
                {/* Contact Form Section */}
                <div className="form-container">
                    <h1>Get in touch 🤝</h1>
                    <p>If you have any questions about our services or want to contact us or share your feedback, we'd love to hear from you.</p>
                    <h2><b>Contact Us</b></h2>
                    <form action="#">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
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
                {/* Up Arrow Icon */}
<div className="up-arrow-icon" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    <i className="fas fa-arrow-up"></i>
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
                <div className='ArrowUp'>
                    <a href="/contact"><FaArrowAltCircleUp/></a>
                </div>
            </div> {/* Closing the colorized section div */}
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
