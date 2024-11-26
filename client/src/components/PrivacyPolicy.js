import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    return (
        <div style={{
            padding: '20px',
            lineHeight: '1.6',
            fontFamily: 'Arial, sans-serif',
            // backgroundColor: '#f4f4f9',
            borderRadius: '8px',
        
            margin: '0 auto',
            // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            color: '#333'
        }}>
            <h1 style={{
                textAlign: 'center',
                fontSize: '3rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>
                Privacy Policy
            </h1>
            <p style={{
                fontSize: '1.2rem',
                textAlign: 'justify',
                color: '#555',
                fontStyle:'Times New Roman'
            }}>
                At <strong>ShelfSync,</strong> we are committed to safeguarding your privacy. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to ensure your information is protected. By using our website, you agree to the terms outlined in this Privacy Policy.
            </p>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Information We Collect</h2>
            <h3 style={{
                fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>Personal Information</h3>
            <p style={{
                fontSize: '1.2rem',
                color: '#555'
            }}>
                When you register on our Website, borrow books, or interact with us, we may collect the following personal information:
            </p>
            <ul style={{
                listStyleType: 'disc',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Library card number</li>
                <li>Login credentials</li>
            </ul>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>How We Use Your Information</h2>
            <p style={{
                fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>We use your information for the following purposes:</p>
            <ul style={{
                listStyleType: 'disc',
                marginLeft: '20px',
                fontSize: '1rem',
                color: '#555'
            }}>
                <li>To manage your library account and loan records</li>
                <li>To send reminders for due dates, overdue items, and fines</li>
                <li>To improve our Website and services</li>
                <li>To provide customer support</li>
                <li>To comply with legal obligations</li>
            </ul>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Cookies and Tracking Technologies</h2>
            <p style={{
                fontSize: '1.2rem',
                color: '#555'
            }}>
                Our Website uses cookies and similar technologies to enhance user experience. Cookies help us track your preferences and activity on our Website. You can modify your browser settings to decline cookies, but this may affect the functionality of the Website.
            </p>
            <h3 style={{
                fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>Types of Cookies We Use:</h3>
            <ul style={{
                listStyleType: 'none',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li><strong>Essential Cookies:</strong> Necessary for basic Website operation.</li>
                <li><strong>Performance Cookies:</strong> Help us analyze Website performance.</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences.</li>
            </ul>
            <h2 style={{
               fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>How We Share Your Information</h2>
            <p style={{
                 fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>We do not sell, rent, or share your personal information with third parties except in the following circumstances:</p>
            <ul style={{
                listStyleType: 'none',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li><strong>With Service Providers:</strong> To support operations like email notifications or Website hosting.</li>
                <li><strong>For Legal Compliance:</strong> To comply with laws, regulations, or legal requests.</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share your information.</li>
            </ul>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Data Security</h2>
            <p style={{
                 fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>
                We implement a variety of security measures to protect your personal information, including:
            </p>
            <ul style={{
                listStyleType: 'none',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li>Encryption of sensitive data</li>
                <li>Regular security audits</li>
                <li>Secure server hosting</li>
            </ul>
            <p style={{
                fontSize: '1.2rem',
                color: '#555'
            }}>
                However, no system is completely secure, and we cannot guarantee absolute security.
            </p>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Your Rights</h2>
            <p style={{
                 fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>You have the following rights regarding your data:</p>
            <ul style={{
                listStyleType: 'none',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li><strong>Access:</strong> Request a copy of the information we hold about you.</li>
                <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete data.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from emails or refuse cookies.</li>
            </ul>
            <p style={{
                fontSize: '1.2rem',
                color: '#555'
            }}>
                To exercise these rights, contact us at [insert contact information].
            </p>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold',
            }}>Third-Party Links</h2>
            <p style={{
                 fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>Our Website may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to read their policies.</p>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Changes to This Privacy Policy</h2>
            <p style={{
                fontSize: '1.2rem',
                color: '#555'
            }}>We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised effective date.</p>
            <h2 style={{
                fontSize: '1.9rem',
                marginTop: '30px',
                color: '#5D4037',
                fontWeight:'bold'
            }}>Contact Us</h2>
            <p style={{
                 fontSize: '1.4rem',
                color: '#5D4037',
                textDecoration:'underline'
            }}>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
            <ul style={{
                listStyleType: 'none',
                marginLeft: '20px',
                fontSize: '1.2rem',
                color: '#555'
            }}>
                <li><strong>Email:</strong> ShelfSync@gmail.com</li>
                <li><strong>Phone:</strong> +91 1234567890</li>
                <li><strong>Address:</strong> Chitkara University, Rajpura, Punjab</li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
