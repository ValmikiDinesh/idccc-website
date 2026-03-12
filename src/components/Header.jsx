import { useState } from "react"
import "../styles/header.css"
import logo from "../assets/idccc-logo.png"

export default function Header(){

const [menuOpen,setMenuOpen] = useState(false)

return(

<header className="header">

<div className="logo-section">

<img src={logo} alt="IDCCC Logo" className="logo-img"/>

<div className="logo-text">

<h2>IDCCC</h2>

<span>Indian Digital Content Creators Council</span>

</div>

</div>

<div className="menu-icon"
onClick={()=>setMenuOpen(!menuOpen)}
>
☰
</div>

<nav className={menuOpen ? "nav open" : "nav"}>

<a href="#">Home</a>
<a href="#">About</a>
<a href="#">Membership</a>
<a href="#">Activities</a>
<a href="#">Contact</a>

<button className="join-btn">
Join Membership
</button>

</nav>

</header>

)

}