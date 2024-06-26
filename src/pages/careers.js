import React, {useState} from "react"
import {Helmet} from 'react-helmet'
import { Link } from 'gatsby'
import Video from "../components/video"
import styled from '@emotion/styled';
import {css} from '@emotion/react';
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import CareerImage1 from "../images/careers/workshop.jpg"
import CareerImage2 from "../images/careers/careers1.jpg"
import CareerImage3 from "../images/careers/careers2.jpg"
import CareerImage4 from "../images/careers/careers3.jpg"

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";

const GridHeroContainer = styled.div`
display: grid;
grid-template-columns: auto repeat(3, 30vw [col-start]) auto;
max-height: 757;
.img1, .img2, .img3 {
    height: 70vh;
    width: 100%;
    position: relative;
    placeItems: center;
    display: grid; 
    @media(max-width: 940px){
        height: 50vh !important;
        grid-row-start: 0 !important;
        grid-row-end: 1 !important;
    }
}
.img1 {
    opacity: 0;
    transform: translateY(45px);
    margin-top: calc(100px + 7vw);
    grid-area: 5/2;
}
.img2 {
    opacity: 0;
    transform: translateY(-30px);
    grid-area: 5/3;
    margin-top: calc(100px + 2vw);
}
.img3 {
    opacity: 0;
    transform: translateY(10px);
    grid-area: 5/4;
    margin-top: calc(100px + 6vw);
}
@media(max-width: 940px){
    grid-template-rows: auto auto;
}
`

const Container = styled.div`
.career-title, .career-text {
    opacity: 0;
}
min-height: calc(100vh - 440px);
height: auto;
color: black;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 100px;
h1 {
    font-weight: 100;
}
p {
    width: 840px;
    text-align: center;
    @media(max-width: 940px){
        width: 90%;
    }
}
`
const Hero = styled.div`
    display: grid;
    grid-area: 5/3;
    position: relative;
    color: white;
    place-items: center;
    .hero-main {
        transform: translateY(10px); 
    }
    .animate-text {
        opacity: 0;
    }
    @media(max-width: 940px){
        /* "auto repeat(3, 30vw [col-start]) auto" */
        grid-row-start: 5;
        grid-row-end: 7;
        grid-column-start: 2;
        grid-column-end: 5;
        /* display: flex; */
    }
`
const HeroContent = styled.div`
@media(max-width: 940px){
    width: auto;
    /* margin: 180px 0; */
    margin: -20px 0 180px 0;
    padding: 20px;
    
    h1 {
    padding: 10px;
    }
    p {
        padding: 10px;
    }
    button {
        padding: 30px 60px !important;
        margin-bottom: 40px !important;
        width: 100% !important;
    }
}
background-color: rgba(255,255,255, 0.9);
color: black;
width: 500px;
margin-left: -15vw;
margin-top: 100px;
padding: 50px 100px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
h1 {
    font-weight: 100;
}
p:last-of-type {
    margin-bottom: 40px;
}
button {
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 10px 60px;
    :hover {
        cursor: pointer;
    }
}
`

const Values = styled.div`
.values-title1, .values-title2, .values-title3 {
    opacity: 0;
}
@media(max-width: 940px){
    display: none;
}
display: flex;
flex-direction: row;
justify-content: space-around;
margin:  15vw 100px 0 100px;
h2 {
    font-weight: 100;
}
`

const Values2 = styled.div`
.value-title {
    opacity: 0;
}
.value-text {
    opacity: 0;
}
    @media(max-width: 940px){
        span {
            display: none !important;
        }
        h2 {
            display: block !important;
            text-align: left;
            width: 100%;
        }
        div {
            div {
                border: none !important;
            }
        }
    }
font-family: 'Heebo',sans-serif;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 5vw;
h2 {
    display: none;
}
span {
    align-self: center;
    padding: 22px 0;
    /* display: flex; */
    /* align-items: flex-end; */
}
.verticalLine {
    height: 120px;
    /* max-height: 200px; */
    border-left: solid rgba(0,0,0,0.1) 1px;
    margin: 0;
    margin-left: 8px;

}
.horizontalLine {
    width: 150px;
    border-top: solid rgba(0,0,0,0.1) 1px;
    margin: 0;
    margin-left: 8px;
}
.horizontalLine:last-of-type {
    display: none;
}
.last {
    visibility: hidden;
}
div {
    display: flex;
    align-items: center;
    div {
    flex-direction: column;
    margin: 40px 0;
    padding: 0 20px;
    max-width: 500px;
    border-left: solid rgba(0,0,0, 0.1) 1px;
    }
}

`


const ContainerSplit2 = styled.div`
@media(max-width: 940px){
    flex-direction: column;
    height: auto;
    .exHover {
        width: 100% !important;
    }
    .textBox {
        width: 100% !important;
    }
    .experienceImgs {
        height: 300px !important;
    }
}
height: 350px;
width: 100%;
flex-direction: row;
color: black;
display: flex;
justify-content: center;
align-items: center;
.experienceImgs {
    max-height: 70vh;
    height: 100%;
    width: 100%;
    filter: brightness(40%); 
}
.textBox {
        position: absolute;
        z-index: 100;
        text-align: left;
        width: 25%;
        text-decoration: underline solid 1px rgba(255,255,255,0);
        p,h1 {
            margin: 10px 20px;
            text-align: center;
        }
        h1 {
            font-weight: 100;
            color: white;
        }
        p {
            color: white;
        }
    }
.career1 {background: url(${CareerImage1})}
.career2 {background: url(${CareerImage2})}
.career3 {background: url(${CareerImage3})}
.career4 {background: url(${CareerImage4})}
.exHover {
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 25%;
    transition: .5s;
    overflow: clip;
    .textBox {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 350px;
        backdrop-filter: brightness(30%);
        transition: .3s;
    }
    :hover {
        cursor: pointer;
        .textBox {
            backdrop-filter: brightness(40%)!important;
        }
    }
}
`
gsap.registerPlugin(useGSAP, ScrollTrigger);


const CareersPage = () => {
    const heroref = useRef();
    useGSAP(
        () => {
            gsap.to(".img1", {
                duration: 2,
                opacity: 1,
                y: 0,
            scrollTrigger: {
                trigger: ".img1",
                start: 'top 90%',
                end: 'bottom 50%',
            },
            })
            gsap.to(".img2", {
                duration: 1.5,
                opacity: 1,
                y: 0,
            })
            gsap.to(".img3", {
                duration: 1,
                opacity: 1,
                y: 0,
            })
            gsap.to(".hero-main", {
                duration: 2,
                y: 0,
                opacity: 1,
            })
            gsap.to(".animate-text", {
                delay: 0.5,
                duration: 2.5,
                opacity: 1,
            })
        },
        { scope: heroref }
    );
    const valuestitleref = useRef();
    useGSAP(
        () => {
            gsap.to(".values-title1", {
                duration: 1,
                opacity: 1,
            scrollTrigger: {
                trigger: ".values-title1",
                start: 'top 70%',
                end: 'bottom 50%',
            },
            })
            gsap.to(".values-title2", {
                delay: .3,
                duration: 1,
                opacity: 1,
            scrollTrigger: {
                trigger: ".values-title2",
                start: 'top 70%',
                end: 'bottom 50%',
            },
            })
            gsap.to(".values-title3", {
                delay: .6,
                duration: 1,
                opacity: 1,
            scrollTrigger: {
                trigger: ".values-title3",
                start: 'top 70%',
                end: 'bottom 50%',
            },
            })
        },
        { scope: valuestitleref }
    );

    const valuesref = useRef();
    useGSAP(
        () => {
            const valuetitles = gsap.utils.toArray(['.value-title', ".value-text"]);
            valuetitles.forEach((box) => {
                gsap.to(box, {
                    opacity: 1,
                    duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 70%',
                    end: 'bottom 50%',
                },
                });
            });
        },
        { scope: valuesref }
    );

    const careertitleref = useRef();
    useGSAP(
        () => {
            const careertitles = gsap.utils.toArray(['.career-title', ".career-text"]);
            careertitles.forEach((box) => {
                gsap.to(box, {
                    opacity: 1,
                    duration: 1,
                scrollTrigger: {
                    trigger: box,
                    start: 'top 70%',
                    end: 'bottom 50%',
                },
                });
            });
        },
        { scope: careertitleref }
    );

    return(
        <Layout title="Careers | Glacier International" invertNav={true}>
            <Helmet>
                <title>Professional Careers | Join the Glacier International Team</title>
                <meta name='description' content='We are now accepting applications for professionals to join our team and help deliver luxury Toyota Hybrid SUVs to Kiwis. Email us today.' />
            </Helmet>
            <GridHeroContainer ref={heroref}>
            <StaticImage
                src={`../images/careers/workshop.jpg`}
                alt="Tundra front on"
                className="img1"
            />
            <StaticImage
                src={`../images/about/AboutCraft.jpg`}
                alt="Tundra front on"
                className="img2"
            />
            <StaticImage
                src={`../images/careers/handshake2.jpg`}
                alt="Tundra front on"
                objectPosition="80% 100%"
                className="img3"
            />
            <Hero>
                <HeroContent className="hero-main">
                <h1 className="animate-text">Working at Glacier International</h1>
                <p className="animate-text">Located at the Innovation and Technology Park at Highlands Cromwell. We are now accepting applications for Automotive professionals to join our team.</p>
                <a  className="animate-text"href="#positions"><button >EXPLORE ROLES</button></a>
                </HeroContent>
            </Hero>
        </GridHeroContainer>

            <Values ref={valuestitleref}>
                <h2 className="values-title1">01 Freedom & Responsibility</h2>
                <h2 className="values-title2">02 Community</h2>
                <h2 className="values-title3">03 Where do I sign?</h2>
            </Values>
            <Values2 ref={valuesref}>
                <div>
                    <span>01<div className="verticalLine"/><div className="horizontalLine"/><div className="verticalLine"/></span>
                    <div>
                        <h2 className="value-title">01 Freedom & Responsibility</h2>
                        <p className="value-text">"Glacier International is a growing business based in the Innovation and Technology Park at the Highlands Cromwell and we’re on the hunt for automotive professionals to join our team”.</p>
                    </div>
                </div>

                <div>
                    <span>02<div className="verticalLine"/><div className="horizontalLine"/><div className="verticalLine"/></span>
                    <div>
                    <h2 className="value-title">02 Community</h2>
                    <p className="value-text">We are a growing, tight-knit team focused on quality. We believe the path to quality is getting the right people for the job, and doing all we can to make sure everyone's interested, happy, and excited about their work.</p>
                    </div>
                </div>

                <div>
                    <span>03<div className="verticalLine"/><div className="horizontalLine"/><div className="verticalLine last"/></span>
                    <div>
                        <h2 className="value-title">03 Where do I sign?</h2>
                        <p className="value-text">"Where do I sign" is our expression for passion, enthusiasm, attention to detail, and prioritisation.</p>
                        <p className="value-text">Whether you're in the workshop, on the phone, or in the courtyard, the goal should always be to push toward a great customer experience. Our aim is always to make our customers line up, with smiles ear to ear saying "where do I sign!?"</p>
                    </div>
                </div>
            </Values2>
            <Container ref={careertitleref}>
                <h1 className="career-title">How To Apply</h1>
                <p className="career-text">
                At Glacier International we prioritise the customer and the team. We desire people focused, motivated team members to enhance the customer experience. 
                </p>
                <p className="career-text">
                Email us your resume and why you want to work with us at careers@glacier.nz.  
                </p>
            </Container>

            <ContainerSplit2 id="positions">
            <a href="mailto:careers@clacier.nz"  className="exHover career1" >
                <div className="textBox">
                    <h1>Automotive Engineers</h1>
                    {/* <p>Do you have passion and experience working with Toyota vehicles? The skill to step up to the next level producing RHD Sequoia’s and Tundra’s? Work closely with our supportive independent certifier on our step by step process.</p> */}
                </div>
            </a>
            <a href="mailto:careers@clacier.nz"  className="exHover career2" >
                <div className="textBox">
                    <h1>Auto-electrical Engineers</h1>
                    {/* <p>If you enjoy forward thinking, joining our wiring team will bring you job satisfaction. The re manufacturing process requires the best of the best with attention to detail and workmanship. </p> */}
                </div>
                {/* <StaticImage
                    className="experienceImgs"
                    objectPosition={"50% 50%"}
                    src={`../images/careers/careers1.jpg`}
                    alt="Glacier engineer working on tundra"
                    
                /> */}
            </a>
            <a  href="mailto:careers@clacier.nz" className="exHover career3">
            <div className="textBox">
                <h1>Logistics officers</h1>
                {/* <p>The reward of arranging logistics of Sequoia’s and Tundra’s requires self motivation and professionalism as you deliver for the customers their pride and joy from the heart of Texas. </p> */}
            </div>
            </a>
            <a href="mailto:careers@clacier.nz"  className="exHover career4">
            <div className="textBox">
                <h1>Product Advisors</h1>
                {/* <p>Passion for product creates success. The main role is enjoying the interactions with customers on their journey to select a hybrid Sequoia or Tundra that best suits their needs and style. </p> */}
            </div>
            </a>
        </ContainerSplit2>

        </Layout>
    )
}

export default CareersPage;