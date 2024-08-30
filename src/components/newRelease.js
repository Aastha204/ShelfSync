import React from "react";
import "../styles/newRelease.css";

function NewRelease() {
    return (
        <div className="recipe-card">
            <aside>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg" alt="Chai Oatmeal" />
                <a href="#" className="button"><span className="icon icon-play"></span></a>
            </aside>

            <article>
                <h2>Chai Oatmeal</h2>
                <h3>Breakfast</h3>

                <ul>
                    <li><span className="icon icon-users"></span><span>1</span></li>
                    <li><span className="icon icon-clock"></span><span>15 min</span></li>
                    <li><span className="icon icon-level"></span><span>Beginner level</span></li>
                    <li><span className="icon icon-calories"></span><span>248</span></li>
                </ul>

                <p>For an extra thick and creamy bowl, add oat bran.  It'll make for a hearty helping and also add more fiber to your meal.  If you love the taste of chai, you'll enjoy this spiced version with coriander, cinnamon, and turmeric.</p>

                <p className="ingredients"><span>Ingredients:&nbsp;</span>Milk, salt, coriander, cardamom, cinnamon, turmeric, honey, vanilla extract, regular oats, oat bran.</p>
            </article>
        </div>
    );
}

export default NewRelease;
