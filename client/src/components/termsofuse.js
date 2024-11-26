import React from "react";
import "../styles/termsofuse.css";
import { useEffect } from "react";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div>
      <header className="terms-header">
        <h1>Terms of Use</h1>
        <p>Welcome to ShelfSync: Effortlessly Managed</p>
      </header>
      <section className="terms-content">
        <h2>1. Introduction</h2>
        <p>
          Welcome to ShelfSync, a library management platform designed to optimize
          the borrowing and lending process. By accessing or using our platform,
          you acknowledge and agree to comply with these Terms of Use. If you
          disagree with any part of these terms, please refrain from using the
          platform.
        </p>
        <p>
          These Terms of Use constitute a legally binding agreement between you and
          ShelfSync. Please read them carefully before using our services.
        </p>

        <h2>2. User Responsibilities</h2>
        <ul>
          <li>
            Ensure the accuracy of all personal information provided during
            registration and update it as necessary.
          </li>
          <li>
            Use the platform responsibly and in compliance with applicable laws and
            regulations.
          </li>
          <li>
            Borrow books for personal use only, adhering to all borrowing and
            return policies.
          </li>
          <li>
            Return borrowed books on or before the due date in their original
            condition.
          </li>
          <li>
            Report lost or damaged books to the administrator immediately to avoid
            further penalties.
          </li>
          <li>
            Maintain the confidentiality of your account credentials and notify us
            promptly if you suspect unauthorized access to your account.
          </li>
        </ul>

        <h2>3. Admin Responsibilities</h2>
        <ul>
          <li>Maintain an accurate and comprehensive inventory of all books.</li>
          <li>
            Monitor borrowing and returning activities to ensure adherence to
            policies.
          </li>
          <li>
            Provide timely notifications to users regarding overdue books, fines,
            or other account-related issues.
          </li>
          <li>
            Handle user data with the highest standards of confidentiality and
            security.
          </li>
          <li>
            Resolve disputes or errors promptly and fairly, maintaining
            transparency in all communications.
          </li>
        </ul>

        <h2>4. Acceptable Use Policy</h2>
        <p>
          Users are prohibited from engaging in any of the following activities:
        </p>
        <ul>
          <li>Using the platform for any unlawful or fraudulent purposes.</li>
          <li>
            Attempting to disrupt or compromise the functionality of the platform,
            including unauthorized access to its systems or data.
          </li>
          <li>
            Sharing, reproducing, or distributing platform content without prior
            authorization.
          </li>
          <li>
            Uploading or transmitting any harmful code, malware, or other content
            that may damage the platform or its users.
          </li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, design elements, and features on the ShelfSync platform,
          including but not limited to text, graphics, logos, and software, are the
          exclusive property of ShelfSync and are protected by copyright, trademark,
          and other intellectual property laws. Unauthorized use, reproduction, or
          distribution is strictly prohibited.
        </p>

        <h2>6. Data Privacy and Security</h2>
        <p>
          ShelfSync is committed to protecting your privacy. All user data is
          handled in accordance with our Privacy Policy. Administrators and users
          are expected to:
        </p>
        <ul>
          <li>Use data responsibly and for its intended purpose only.</li>
          <li>
            Report any suspected data breaches or unauthorized access immediately.
          </li>
        </ul>

        <h2>7. Limitations of Liability</h2>
        <p>
          While we strive to provide a reliable and efficient platform, ShelfSync
          disclaims all liability for:
        </p>
        <ul>
          <li>Data loss due to unforeseen circumstances or technical failures.</li>
          <li>
            Inaccuracies or errors in the content provided on the platform.
          </li>
          <li>
            Interruptions in service caused by maintenance, updates, or external
            factors.
          </li>
        </ul>

        <h2>8. Overdue Books and Penalties</h2>
        <p>
          Overdue books will incur a fine of $2 per day, up to a maximum of $50.
          Books not returned within 30 days of the due date will be considered lost,
          and users will be billed the replacement cost.
        </p>

        <h2>9. Termination of Access</h2>
        <p>
          ShelfSync reserves the right to suspend or terminate access to the
          platform for users who violate these Terms of Use or engage in activities
          that compromise the platform's integrity or the safety of its users.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these Terms of Use periodically to reflect changes in our
          services, legal requirements, or other relevant factors. Continued use of
          the platform after such updates constitutes your acceptance of the revised
          terms.
        </p>

        <h2>11. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms of Use are governed by the laws of India. Any
          disputes arising from the use of the platform will be resolved through
          binding arbitration in accordance with [Arbitration Rules].
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have any questions, concerns, or feedback regarding these Terms of
          Use, please reach out to us through our{" "}
          <a href="/contact">Contact Us</a> page.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
