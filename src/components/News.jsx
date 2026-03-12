export default function News(){

return(

<section style={{
padding:"80px",
background:"#f5f5f5",
textAlign:"center"
}}>

<h2>News & Announcements</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"25px",
marginTop:"40px"
}}>

<div style={cardStyle}>
<h3>IDCCC Creator Conference</h3>
<p>National creator conference for digital media.</p>
</div>

<div style={cardStyle}>
<h3>Digital Journalism Workshop</h3>
<p>Training for responsible journalism.</p>
</div>

<div style={cardStyle}>
<h3>RTI Awareness Program</h3>
<p>Promoting transparency across India.</p>
</div>

</div>

</section>

)

}

const cardStyle={
padding:"25px",
border:"1px solid #ddd"
}