import CountUp from "react-countup"
import "../components/stats.css"

import { FaUsers, FaNewspaper, FaGlobeAsia, FaChalkboardTeacher } from "react-icons/fa"

export default function Stats(){

return(

<section className="stats">

<div className="stat-box">

<div className="stat-icon">
<FaUsers size={40}/>
</div>

<h2>
<CountUp end={1000} duration={3}/>+
</h2>

<p>Digital Creators Network</p>

</div>


<div className="stat-box">

<div className="stat-icon">
<FaNewspaper size={40}/>
</div>

<h2>
<CountUp end={500} duration={3}/>+
</h2>

<p>Journalists Supported</p>

</div>


<div className="stat-box">

<div className="stat-icon">
<FaGlobeAsia size={40}/>
</div>

<h2>
<CountUp end={28} duration={3}/>
</h2>

<p>States Covered</p>

</div>


<div className="stat-box">

<div className="stat-icon">
<FaChalkboardTeacher size={40}/>
</div>

<h2>
<CountUp end={120} duration={3}/>+
</h2>

<p>Legal Advisers</p>

</div>

</section>

)

}