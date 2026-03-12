import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Header from "../components/Header"

export default function Membership(){

const navigate = useNavigate()

const [form,setForm] = useState({})

const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

const submitForm = async(e)=>{

e.preventDefault()

const res = await axios.post(
"http://localhost:4000/api/membership/apply",
form
)

const memberId = res.data.memberId

alert("Registration Successful")

navigate(`/payment/${memberId}`)

}

return(

<div>

<Header/>

<h2 style={{textAlign:"center"}}>Membership Form</h2>

<form
onSubmit={submitForm}
style={{maxWidth:500,margin:"auto"}}
>

<input name="fullName" placeholder="Full Name" onChange={handleChange}/>
<br/><br/>

<input name="fatherName" placeholder="Father Name" onChange={handleChange}/>
<br/><br/>

<input name="mobile" placeholder="Mobile" onChange={handleChange}/>
<br/><br/>

<input name="email" placeholder="Email" onChange={handleChange}/>
<br/><br/>

<input name="address" placeholder="Address" onChange={handleChange}/>
<br/><br/>

<input name="district" placeholder="District" onChange={handleChange}/>
<br/><br/>

<input name="state" placeholder="State" onChange={handleChange}/>
<br/><br/>

<input name="occupation" placeholder="Occupation" onChange={handleChange}/>
<br/><br/>

<select name="membershipType" onChange={handleChange}>

<option>General Member</option>
<option>Journalist Member</option>
<option>Lifetime Member</option>

</select>

<br/><br/>

<button type="submit">

Register

</button>

</form>

</div>

)

}