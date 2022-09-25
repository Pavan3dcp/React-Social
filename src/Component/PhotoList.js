import classes from './PhotoList.module.css'
const PhotoList = (props)=>{
  return(
    <>
    <img className={classes.container} src={props.src} alt={props.alt} title={props.title}></img>
    <h3>{props.name}</h3>
    <p>{props.bio}</p>
    <p>{props.location}</p>
    </>
  )
}

export default PhotoList;