import React, {useState} from "react"
import {Helmet} from 'react-helmet'
import { Link } from "gatsby"
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import TundraImage from "../images/about/tundraAbout.png"
import SequoiaImage from "../images/about/sequoiaAbout.png"
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";


const Container = styled.div`
.animate-intro1, .animate-intro2, .animate-intro3, .animate-intro4 {
    opacity: 0;
} 
/* margin: 80px 0; */
/* height: calc(100vh - 440px); */
@media(max-width: 940px){
    p {
        margin: 20px;
    }
    margin-bottom: 60px;
}
min-height: 515px;
height: 100%;
color: black;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
p {
    max-width: 600px;
    text-align: center;
}
p:last-of-type {
    padding-bottom: calc(1.5em + 35px);
}
h2 {
    /* padding: 0;
    margin: 0; */
    padding-top: 1.5em;
}
`
const ContainerSplit = styled(Container)`
flex-direction: row;
justify-content: left;
height: 90vh;
.imageclass {
        max-height: 90vh;
        height: 100%;
        width: 35vw;
}
@media(max-width: 940px){
    flex-direction: column-reverse;
    height: auto;
    .imageclass {
        // margin: 100px 0 0 0;
        align-self: flex-start;
        width: 90vw;
        min-height: 150px;
        // height: 50vw;
    }
}
` 
const ContainerSplit2 = styled(ContainerSplit)`
height: 70vh;
width: 100%;
.tundraImage {
    background: url(${TundraImage});
}
.sequoiaImage {
    background: url(${SequoiaImage});
}
.exHover {
    min-height: 500px;
    width: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* width: 100vw; */
    text-decoration: none;
    p {
        min-height: 500px;
        max-width: unset;
        margin: 0;
        padding-top: 60px;
        font-size: 26px;
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        // backdrop-filter: brightness(50%)!important;
        backdrop-filter: blur(0px) brightness(50%);
        z-index: 100;
        color: white;
        transition: .5s;
        text-decoration: none;
    }
    transition: .5s;
    :hover {
        cursor: pointer;
        p {
            backdrop-filter: blur(10px)!important;
        }
    }
}
.experienceImgs {
    max-height: 70vh;
    height: 100%;
    width: 100%;
    filter: brightness(40%); 
}
`
const ContainerLeft = styled.div`
@media(max-width: 940px){
    padding: 20px;
    height: auto;
    p {
        padding: 0 60px 20px 0;
        margin: 0;
    }
}
display: flex;
justify-content: center;
padding: 10px 80px;
flex-direction: column;
text-align: left!important;
// height: 800px;
p {
    text-align: left;
    max-width: 520px;
}
.animate-text1, .animate-text2 {
opacity: 0;
}
`
    


//video styling
const Youtube2 = styled.div`
img {
    object-position: top;
}
button {

    width: 150px;
    height: 150px;
    font-size: 2rem;
    font-weight: 100;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
    background-color: rgba(0,0,0,0);
    transition: .3s;
    :hover {
        cursor: pointer ;
        background-color: rgba(355, 355, 355, 0.4)
    }
}
`
const About = styled.div`
h1 {
    opacity: 0;
    color: white; 
}
font-size: 30px;
margin-top: 150px;
`

const popupStyles = ({videoOpen}) => css`
display: none;
position:fixed;
.dim {
    position: fixed;
    z-index: -100;
    top: 0;
    left: 0;
    ${'' /* transition: .3s; */}
    transition-delay: .3s;
    transition: background-color .3s, z-index .4s;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0);
}
iframe {
    width: 100%; 
    height: 600px;
    @media(max-width:980px){
        height: 65%;
    }
}

${videoOpen === true &&`
display: block;
z-index: 110 !important;
.dim {
    z-index: 50;
    transition: background-color .3s, z-index .1s;
    background-color: rgba(0,0,0,.3);
}
.overlay {
    z-index: 110 !important;
    position: fixed;
    max-width: 900px;
    width: 100%;
    height: 100%; 
    top:8%;
    left: 50%;
    transform: translate(-50%, 0);
}

button {
    background-color: rgba(0,0,0,0);
    border: none;
    color: white;
    :hover {
        cursor: pointer;
    }
    top: -4%;
    right: -2%;
}
.hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;
    background-color: rgba(0,0,0,0);
    opacity: 0.5;
    transition: .3s;
    :hover {
        opacity: 1;
    }
}
.hamburger-inner-active {
        transition: .3s;
        display: block;
        width: 20px;
        height: 3px;
        background-color: white;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        transform: rotate(45deg);
        transition: top 0.075s ease,
        transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      } 
    .hamburger-inner-active::after {
        width: 20px;
        height: 3px;
        background-color: white;
        border-radius: 4px;
        position: absolute;
        content: "";
        right: 0%;
        bottom: 0;
        transform: rotate(-90deg);
        transition: bottom 0.075s ease,
        transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
`}
`
//video styles end

gsap.registerPlugin(useGSAP, ScrollTrigger);



const AboutPage = () => {
    const [videoOpen, setVideoOpen] = useState(false);
    const title = useRef();
    const text = useRef();
    const text2 = useRef();
    useGSAP(
        () => {
            gsap.to(".animate-title", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-title",
                start: 'top 90%',
                end: 'bottom 50%',
              },
            })
        },
        { scope: title }
    );
    useGSAP(
        () => {
            gsap.to(".animate-intro1", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-intro1",
                start: 'top 90%',
                end: 'bottom 50%',
              },
            })
            gsap.to(".animate-intro2", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-intro2",
                start: 'top 90%',
                end: 'bottom 50%',
              },
            })
            gsap.to(".animate-intro3", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-intro3",
                start: 'top 90%',
                end: 'bottom 50%',
              },
            })
            gsap.to(".animate-intro4", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-intro4",
                start: 'top 90%',
                end: 'bottom 50%',
              },
            })
        },
        { scope: text }
    );
    useGSAP(
        () => {
            gsap.to(".animate-text1", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-text1",
                start: 'top 70%',
                end: 'bottom 50%',
              },
            })
            gsap.to(".animate-text2", {
                duration: 2,
                opacity: 1,
              scrollTrigger: {
                trigger: ".animate-text2",
                start: 'top 70%',
                end: 'bottom 50%',
              },
            })
        },
        { scope: text2 }
    );

    return(
        <Layout title="About Us | Glacier International" pageLocation={"/about"} >
        <Helmet>
            <title>One-Stop-Shop for Right-Hand Drive Toyota Sequoia & Tundra</title>
            <meta name='description' content='Glacier International team helps Kiwis who value reliability, performance and class to deliver the best right-hand drive Toyota Sequoia and Tundra in NZ.' />
        </Helmet>
        <div style={{ display: "grid", maxHeight: 440}}>
            <StaticImage
                src={`../images/about/AboutHero.png`}
                alt="Tundra front on"
                style={{
                        height: "440px",
                        gridArea: "1/1",
                        position: "relative",
                        placeItems: "center",
                        display: "grid",
                    }}
            />
            <About ref={title}
                style={{
                    gridArea: "1/1",
                    position: "relative",
                    placeItems: "center",
                    display: "grid",
                    }}>
                <h1 className="animate-title">About Us</h1>
            </About>
            
        </div>
            
            <Container ref={text}>
                <h2 className="animate-intro1">Our Story</h2>
                <p className="animate-intro2">
                The brain-child of Toyota qualified technicians, Glacier International is the only solution for discerning customers who covet our right-hand-drive Sequoia or Tundra and demand proven OEM (Original Equipment Manufacture) quality, reliability and performance.
                </p>
                <p className="animate-intro3">
                “As a Toyota trained technician it was crucial for me to design a remanufacturing package that was indiscernible from OEM fit and finish. Our Tundra’s and Sequoia’s are guaranteed to meet or exceed our customers’ expectations.” 
                -       Malcom King, Founder and President.   
                </p>
                <p className="animate-intro4">
                Glacier International was founded in 2016, is the only dedicated Tundra and Sequoia remanufacturer in New Zealand. With multiple satisfied customers Glacier International has forged a reputation for uncompromised remanufactured vehicles. 
                </p>
                {/* <p>
                “The team at Glacier International are friendly, professional and incredibly easy to deal with -  No request was too big or small and I couldn’t be happier with the finished product. My Tundra is by far the best truck I have ever owned and will be kept in my family for years to come.” 
                - Blake Speirs, Customer. 
                </p> */}
            </Container>
            <Youtube2 style={{ display: "grid", maxHeight: 640}} id="homeSection">
            <StaticImage
                src={`../images/about/SoldImage.JPG`}
                alt="Sold Tundra Image"
                style={{
                        maxHeight: "640px",
                        gridArea: "1/1",
                        position: "relative",
                        placeItems: "center",
                        display: "grid",
                        filter: "brightness(40%)"
                    }}
            />   
            <div
                style={{
                    gridArea: "1/1",
                    position: "relative",
                    placeItems: "center",
                    display: "grid",
                    }}
                >
                <button onClick={() => {setVideoOpen(!videoOpen)}}>PLAY</button>
            </div>
        </Youtube2>


        
        <div css={popupStyles({ videoOpen })} >
            <div className="dim" onClick={() => setVideoOpen(!videoOpen)}/>
            <div className="overlay">
                {/* <button onClick={() => {setVideoOpen(!videoOpen)}}>close</button> */}
                <button css={popupStyles({ videoOpen })} onClick={() => setVideoOpen(!videoOpen)} aria-label="Navigation menu toggle">
                        <span className="hamburger-box">
                            <span className="hamburger-inner-active"></span>
                        </span>
                </button>
                <iframe  src={(videoOpen ? "https://www.youtube.com/embed/videoseries?list=PLuYwryiueK-4mtYgDOpM9ZEWnhqUsrHgB&autoplay=1" : "https://www.youtube.com/embed/videoseries?list=PLuYwryiueK-4mtYgDOpM9ZEWnhqUsrHgB")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullscreen></iframe>
            </div>
        </div>  

        <ContainerSplit ref={text2}>
            <StaticImage
                src={`../images/about/AboutCraft.jpg`}
                alt="Glacier International Workshop Polishing Tundra"
                className="imageclass"
                objectPosition={"50% 20%"}
            />
            <ContainerLeft >
                <h2 className="animate-text1">Our Craftsmanship</h2>
                <p className="animate-text2">At Glacier International quality is at the forefront. Not only are we meticulous in meeting OEM standards, we're also partnered with leading additive manufacturing and design specialists to produce injection moulded aesthetic components.</p>
            </ContainerLeft>
        </ContainerSplit>

        <ContainerSplit2>
            <Link to={"/experience-tundra"} className="exHover tundraImage" >
                <p>Experience Tundra</p>
            </Link>
            <Link to={"/experience-sequoia"} className="exHover sequoiaImage">
                <p>Experience Sequoia</p>
            </Link>
            
        </ContainerSplit2>
        </Layout>
    )
}

export default AboutPage;