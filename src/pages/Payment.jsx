import {useParams} from "react-router-dom"
import axios from "axios"
import Header from "../components/Header"

export default function Payment(){

const {id} = useParams()

const payNow = async()=>{

const res = await axios.post(
`https://idccc-backend.onrender.com/api/payment/success/${id}`,
{
paymentId:"PAY123456"
}
)

alert("Membership Activated")

alert("Membership ID: "+res.data.membershipID)

}

return(

<div>

<Header/>

<div style={{textAlign:"center",marginTop:100}}>

<h2>Membership Payment</h2>

<p>Registration Fee: ₹199</p>

<button
onClick={payNow}
style={{padding:15,fontSize:18}}
>

Pay Now

</button>

</div>

</div>

)

}