import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/home.css"
import Stats from "../components/Stats"
import hero from "../assets/hero-banner.png"

export default function Home(){

return(

<div>

<Header/>

<section className="hero">

<img src={hero} className="hero-img"/>

<div className="hero-content">

<p>
Indian Digital Content Creators Council (IDCCC)
</p>

<button>
Join Membership
</button>

</div>

</section>

<Stats/>

<section className="about">

<h2>About IDCCC</h2>

<p>

Indian Digital Content Creators Council supports digital creators,
journalists and influencers across India through legal awareness & community building.

</p>

</section>


<section className="benefits">

<h2>Membership Benefits</h2>

<div className="grid">

<div className="card">

<h3>Creator Rights</h3>

<p>Support and protection for creators.</p>

</div>

<div className="card">

<h3>National Network</h3>

<p>Connect with creators across India.</p>

</div>

<div className="card">

<h3>Our Aim</h3>

<p>To empower digital content creators in India through legal support.</p>

</div>

</div>

</section>

<Footer/>

</div>

)

}