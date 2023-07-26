import axios from 'axios'


function CheckOut({cartItems}) {
    const user = 1;
    const handleCheckout = ()=>{
        axios.post('http://localhost:8082/create-checkout-session', {
            userID: user,
            cartItems
        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((error=>{
            console.log(error)
        }))
    }
  return (
    <>
    <button onClick={()=>handleCheckout()}>
        Checkout
    </button>
    </>
  )
}

export default CheckOut