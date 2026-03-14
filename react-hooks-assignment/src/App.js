import React, { useState, useEffect } from "react";

function useFetch(url) {

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{

    fetch(url)
    .then(res => res.json())
    .then(result=>{
      setData(result);
      setLoading(false);
    })
    .catch(()=>{
      setError("Error fetching data");
      setLoading(false);
    })

  },[url])

  return {data,loading,error}

}


function App(){

const {data,loading,error} = useFetch(
"https://api.escuelajs.co/api/v1/products"
)

if(loading) return <h2>Loading...</h2>

if(error) return <h2>{error}</h2>

return(

<div style={{padding:"20px"}}>

<h1>Products</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}
>

{data.slice(0,8).map(item=>(
<div
key={item.id}
style={{
border:"1px solid gray",
padding:"10px"
}}
>

<img
src={item.images[0]} alt={item.title}
style={{width:"100%",height:"200px",objectFit:"cover"}}
/>

<p>{item.title}</p>

</div>
))}

</div>

</div>

)

}

export default App;
