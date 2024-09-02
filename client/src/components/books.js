import React from 'react';
import BookCards from './cards';
import Footer from './Footer';
import NewReleases from './newRelease';
import BestAuthor from './bestauthorbooks';
import BestFictional from './listofbestfictionbooks';
import Amazonseller from './amazonbestsellersbooks';
import Children from './children';
import History from './history';
import Fiction from './fiction';
import Thriller from './thriller';
import Romance from './romance';
import Comics from './comics';
import BookType from './booktypes';

function Books() {
    return (
        <>
            <div id="browse">
                <BookType/>
            </div>

            <div>
                <BookCards/>
            </div>

            <div id="newrelease">
                <NewReleases/>
            </div>

            <div id="bestauthor">
                <BestAuthor/>
            </div>

            <div id="bestfiction">
                <BestFictional/>
            </div>

            <div id="amazonseller">
                <Amazonseller/>
            </div>

            <div id="children">
                <Children/>
            </div>

            <div id="history">
                <History/>
            </div>

            <div id="fiction">
                <Fiction/>
            </div>

            <div id="thriller">
                <Thriller/>
            </div>

            <div id="romance">
                <Romance/>
            </div>

            <div id="comics">
                <Comics/>
            </div>

            <div id="footer">
                <Footer/>
            </div>
        </>
    );
};

export default Books;
