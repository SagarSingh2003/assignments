import { useState , memo , useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {





  return(
    <>
    <FormElement ></FormElement>
    <CardBody name={"Lokeshwar"} description={"A TA in the 100xDevs Cohort 2.0"} interests={["Ionic" , "Open Source" , "App Dev"]} SocialInfo={[{platform : "Twitter"  , link :  "www.twitter.com"} , { platform : "LinkedIn" , link : "www.linkedIn.com"}]}></CardBody>


    <CardBody name={"Diptilal"} description={"A CEO in the 100xDevs Cohort 2.0"} interests={["Designer" , "Open Source" , "Love Dev"]} SocialInfo={[{platform : "instagram"  , link :  "https://twitter.com/_SagarSingh___"} , { platform : "LinkedIn" , link : "www.linkedIn.com"}]}></CardBody>


    <CardBody name={"Masadur"} description={"A CTO in the 100xDevs Cohort 2.0"} interests={["Designer" , "Open Source" , "Smart Dev"]} SocialInfo={[{platform : "instagram"  , link :  "https://twitter.com/_SagarSingh___"} , { platform : "LinkedIn" , link : "www.linkedIn.com"}]}></CardBody>
    </>
  
    )

}



function CardBody({name , description , interests , SocialInfo}){


  let counter = 0;
  let counter2 = 0;

  let arrOfSocialInfo = [];
  let arrOfInterests = [];
  for( let i = 0 ; i < interests.length ; i++){
      arrOfInterests.push(<li key={counter2}>{interests[i]}</li>)
      counter2 += 1;
  }
  

  for(let i of SocialInfo){
    arrOfSocialInfo.push(
      <SocialBtn key={counter} SocialLink={i.link} SocialPlatform={i.platform}></SocialBtn>)
      counter += 1;
  }

  return(
    <div className="Card">
      <h2 className="cardName">{name}</h2>
      <p className="cardDescription">{description}</p>
      <h3 className='cardInterests'>Interests</h3>
      <ul className="interestList">
        {arrOfInterests}
      </ul>

      <section className='SocialLinks'>
        {arrOfSocialInfo}
      </section>
    </div>
  )  
}

function SocialBtn({SocialLink , SocialPlatform}){
  return(
    <span className="socialBtn"><a href={SocialLink}>{SocialPlatform}</a></span>
  )
}





const FormElement = memo(function FormElement(){

  const buttonRef = useRef();

  return (
    <form >
      <section>
        <label htmlFor="name">Enter Name : </label>
        <input type="text" id="name" name="name"  />
      </section>
      <section>
        <label htmlFor="description">Enter Description : </label>
        <input type="text" id="description" name="description" />
      </section>
      <section>
        <label htmlFor="interest">Enter Interests : </label>
        <input id="interest" type="text" name="interest1" placeholder="Enter Interest" />
        <input type="text" name="interest2" placeholder="Enter Interest 2" />
        <input type="text" name="interest3" placeholder="Enter Interest 3" />        
      </section>
      <section>
        <label htmlFor="social-links">Enter Social Links : </label>
        <input type="text" name="platform-name-1" id="social-links" placeholder="enter platform name" />
        <input type="text" name="link-1" placeholder="enter link" />
        <input type="text" name="platform-name-2" placeholder="enter platform name" />
        <input type="text" name="link-2" placeholder="enter link" />
      </section>
      <button id="createComponentButton" ref={buttonRef} onClick={createComponent}>Create Card</button>
    </form>
  )
});

function createComponent(){
  console.log("hi");
}



export default App
