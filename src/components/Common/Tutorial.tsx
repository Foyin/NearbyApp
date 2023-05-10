import styles from "./Tutorial.module.scss";
import step4 from "../../images/tutorial/4.png";
import step5 from "../../images/tutorial/5.png";
import step6 from "../../images/tutorial/6.png";
import step7 from "../../images/tutorial/7.png";
import step8 from "../../images/tutorial/8.png";
import step9 from "../../images/tutorial/9.png";
import step10 from "../../images/tutorial/10.png";
import step11 from "../../images/tutorial/11.png";
import step12 from "../../images/tutorial/12.png";
import step13 from "../../images/tutorial/13.png";
import step14 from "../../images/tutorial/14.png";
import step15 from "../../images/tutorial/15.png";
import step16 from "../../images/tutorial/16.png";
import step17 from "../../images/tutorial/17.png";
import step18 from "../../images/tutorial/18.png";
import step19 from "../../images/tutorial/19.png";
import step20 from "../../images/tutorial/20.png";
import step21 from "../../images/tutorial/21.png";
import step22 from "../../images/tutorial/22.png";
import step23 from "../../images/tutorial/23.png";
import step24 from "../../images/tutorial/24.png";
import routeImg from "../../images/tutorial/routeImg.png";

import getLocation from "../../images/tutorial/getLocation.png";


const Tutorial = () => {
    return(
        <div className={styles.tutorialContainer}>
            <h1>How To Use</h1>
            <p>This is a route planner. It can be used for various applications, but the core idea is that it is for when you need to keep 
                a record of all the significant places near you and how far they are so you can easily plan trips to multiple places at once
                before starting a trip. For example if you want to move to a new home but you want to keep a record of all the close by 
                ammenities, like, grocery stores, gyms, malls or restaurants, before going for a viewing. With this web app you can
                search for all the places close to a given location and record them. This information can be used to quickly narrow down your
                list of prospective homes so you dont have to waste time going for viewings at homes that dont have the desired ammenities.
                A more simple example could be for moving companies to plan or companies that deliver goods to multiple locations to plan trips before hand.
                You can also check the general distance between places.</p>

            <p>You can save a list of routes or a list of places. You can then select a place from the list and add nearby places to it. You can also multiple nearby routes to each place. </p>
            <hr/>
            <h2>Find General Route</h2>
            <div>The most simple feature is being able to check the route of two points on the map. You can do this when you click on the route button. When the route panel is open you can click two points of the map to find their distance information. </div>

            <img src={routeImg} alt="Chack Route"/>

            <h2>Adding Places And Nearby Places</h2>
            <div>Search For location With seach bar</div>
            <img src={step4} alt="1st Step"/>
            <div>Or use navigation button to jump to your location. Make sure to enable geolocation on your device for this to work</div>
            <img id={styles.icon} src={getLocation} alt="2nd Step"/>
            <div>Click Icon to add location to places tab</div>
            <img src={step5} alt="3rd Step"/>
            <div>Places tab opens when place is added, click places button to open and close panel</div>
            <img src={step6} alt="4th Step"/>
            <div>Search for other nearby locations</div>
            <img src={step7} alt="5th Step"/>
            <div>Click on added location to select it, then click icon to add nearby location to selected location</div>
            <img src={step8} alt="6th Step"/>
            <img src={step9} alt="7th Step"/>
            <h2>Adding Routes And Nearby Routes</h2>
            <div>Click highlighted icon to select departure position</div>
            <img src={step10} alt="8th Step"/>
            <div>Click highlighted icon to select destination position</div>
            <img src={step11} alt="9th Step"/>
            <div>After selecting destination position Route panel opens, select options and click button to calculate route</div>
            <img src={step12} alt="10th Step"/>
            <div>After clicking calculate, a route summary poops up</div>
            <img src={step13} alt="11th Step"/>
            <div>Click highlighted button to add route to selected location</div>
            <img src={step14} alt="12th Step"/>
            <img src={step15} alt="13th Step"/>
            <img src={step16} alt="14th Step"/>
            <div>Click highlighted button to add route to other list of routes only</div>
            <img src={step17} alt="15th Step"/>
            <img src={step18} alt="16th Step"/>
            <img src={step19} alt="17th Step"/>
            <div>Click reset button to start new route calculation</div>
            <img src={step20} alt="18th Step"/>
            <img src={step21} alt="19th Step"/>
            <img src={step22} alt="20th Step"/>
            <div>A list with multiple items could look like this</div>
            <img src={step23} alt="21th Step"/>
            <img src={step24} alt="22th Step"/>
        </div>
    );
}

export default Tutorial;