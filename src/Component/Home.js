import PhotoList from "./PhotoList";

const Home = (props)=>{
return(

  <div>
  {props.photos.map((photo)=>(
    
    <PhotoList src={photo.urls.regular}
    alt={photo.alt_description}
    title={photo.alt_description} bio={photo.user.bio} name={photo.user.name} location={photo.location.name} key={photo.id}> </PhotoList>

  )
  )}
  </div>
);
}

export default Home;