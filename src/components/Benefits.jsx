import { FaUsers, FaBalanceScale, FaCertificate } from "react-icons/fa"

export default function Benefits(){

return(

<section style={{padding:"80px",textAlign:"center"}}>

<h2>Membership Benefits</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px",
marginTop:"40px"
}}>

<div>

<FaUsers size={40}/>

<h3>Creator Community</h3>

<p>Connect with digital creators across India.</p>

</div>

<div>

<FaBalanceScale size={40}/>

<h3>Digital Creators Rights Protection</h3>

<p>Support and protection for journalists, influencers and content creators.</p>

</div>

<div>

<FaCertificate size={40}/>

<h3>Official Membership ID</h3>

<p>Receive IDCCC membership certificate.</p>

</div>

</div>

</section>

)

}