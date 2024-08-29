import React from 'react';
import '../styles/UserProfile.css';

const MemberProfile = () => {
    return (
        <div className="profile-page">
            <aside className="sidebar">
                <h2>ShelfSync</h2>
                <ul>
                    <a>Profile</a>
                    <a>Available Books</a>
                    <a>Return</a>
                    <a>Log out</a>
                </ul>
            </aside>
            <main className="profile-main">
                <div className="profile-card">
                    <div className="profile-info">
                        <img src="https://via.placeholder.com/100" alt="Profile" />
                        <div>
                            <h3>Sai Pranavdhar Reddy</h3>
                            <p>PRANAV1234</p>
                            <p>pranav1234@gmail.com</p>
                            <p>9876543210</p>
                        </div>
                    </div>
                    <div className="profile-details">
                        <div>
                            <p>Age</p>
                            <p>50</p>
                        </div>
                        <div>
                            <p>Gender</p>
                            <p>Male</p>
                        </div>
                        <div>
                            <p>DOB</p>
                            <p>05/22/2002</p>
                        </div>
                        <div>
                            <p>Address</p>
                            <p>-</p>
                        </div>
                    </div>
                </div>
                <div className="issued-books">
                    <h4>Issued</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Book-Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Fine</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Example Book</td>
                                <td>01/01/2024</td>
                                <td>01/15/2024</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Example Book</td>
                                <td>01/01/2024</td>
                                <td>01/15/2024</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Example Book</td>
                                <td>01/01/2024</td>
                                <td>01/15/2024</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </main>
        </div>
    );
};

export default MemberProfile;
