import React, {useEffect, useState, useRef} from "react"

import Layout from "../components/layout"
import styled from '@emotion/styled';
import { useForm } from "react-hook-form"
import { navigate, Link } from "gatsby";
import useGooglePlaceAutoComplete from "../components/google_place_autocomplete";
import TermsAndConditions from "../../static/TermsAndConditionsGlacierInternationalLimited.pdf";

const Container = styled.div`
margin: 200px auto;
min-height: 90vh;
heiht: 100%;
max-width: 800px;
width: 90%;
/* margin: 0 10px; */
form {
    @media(max-width: 500px){
        body, label, p {
            font-size: 18px !important;
        }
        form {
            font-size: 18px !important;
            h2 {
                font-size: 24px !important;
            }
        }
        p,label, input{
            font-size: 18px !important;
        }
        div {
            p {
                font-size: 18px !important;
            }
        }
    }
    display: flex;
    flex-direction: column;
    text-align: left;
    .checkboxes {
        width: 50%;
        display: flex;
        justify-content: center;
        font-size: 18px;
        margin: 6px;
        label {
            
        }
        input {
            width: 18px;
            margin: 1px 8px;
            padding: 1px;
        }
    }
    .submit-message {
        display: flex;
        margin: auto;
        transition: .3s;
        opacity: 1;
    }
    .submit-message-none {
        display: flex;
        opacity: 0;
        margin: auto;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        label {
            width: 45%;
        }
        @media(max-width: 940px){
        flex-direction: column;
        label {
            width: 100%;
        }
        }
    }
    input, textarea {
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 10px;
    }
    .buttonWrap {
        display: flex;
        flex-direction: row;
    }
    .backBtn {
        width: 24%;
        background-color: grey;
        :hover {
            background-color: dimgrey;
        }
        margin: 40px 0;
    }
    .submitBtn {
        width: 80%;
        margin: 40px auto;
    }
    button {
    background-color: #4C974C;
    color: white;
    width: 74%;
    font-size: 20px;
    letter-spacing: 1.4px;
    padding: 14px;
    font-weight: 600;
    font-family: 'Heebo',sans-serif;
    border: none;
    margin: 40px 0;
    border-radius: 5px;
    transition: .3s;
    :hover {
        border: none;
        background-color: #448744;
        cursor: pointer;
    }
}
}
`

const Flex = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
`

export default function OrderPage ({location}){
    const [order, setOrder] = useState();
    const [formStage, setFormStage] = useState(0);
    const [initialFormData, setInitialFormData] = useState();
    const [fileUploadData, setFileUploadData] = useState();
    const [locationData, setLocationData] = useState();
    const [activeCampaignID, setActiveCampaignID] = useState();
    const [addressInput, setAddressInput] = useState();

    // google autocomplete
    const address1Ref = useRef();
    const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
    let autoComplete = "";

    //add useEffect to check search params
    useEffect(() => {
        console.log("useEffect1 running")
        console.log("Search", location.search)
        if (location.search.length > 1 && formStage === 0){
            
            const ID = location.search.substring(1);
                fetch('/api/xero3', {
                    method: 'POST',
                    body: JSON.stringify({
                        ID: ID,
                    }),
                    headers: {
                      "content-type": `application/json`,
                    },
                }).then(res => res.json())
                .then(body => {
                    setFormStage(1);
                    console.log(body)
                    let testBuild = "Blueprint 2023 Sequoia Limited Hybrid TRD OFF ROAD bed option: 2 $265000"
                    console.log(body.fieldValues[0].value)
                    setInitialFormData({firstname: body.contact.firstName, lastname: body.contact.lastName, phone: body.contact.phone, email: body.contact.email})
                    //get order info out of activecampaign string & set to local/state so can continue with order.
                    let space = 13;
                    if(body.fieldValues[0].value.match("2023 Tundra")){space = 12}
                    let findBed = body.fieldValues[0].value.indexOf("bed");
                    let findModel = body.fieldValues[0].value.indexOf("2023");
                    localStorage.setItem('model', body.fieldValues[0].value.substr(findModel, 12));
                    localStorage.setItem('color', body.fieldValues[0].value.substr(0, findModel));
                    localStorage.setItem('grade', body.fieldValues[0].value.substr(findModel+space,findBed-(findModel+space)));
                    localStorage.setItem('bed', body.fieldValues[0].value.substr(findBed, 13));
                    localStorage.setItem('price', body.fieldValues[0].value.substr(findBed+15, 8));
                    setActiveCampaignID(ID)
                    setOrder({
                        model: localStorage.getItem('model'), 
                        grade: localStorage.getItem('grade'),
                        color: localStorage.getItem('color'),
                        bed: localStorage.getItem('bed'),
                        price: localStorage.getItem('price'),
                    })
                    console.log("Order: ",order)
                    console.log(localStorage.getItem('price'))

                })
                .catch((error) => alert(error))
        }

    },[])


    {/* Here I need to check for location & add to cache || if no location, check for localstorage and set that as state */}
    useEffect(() => {
        console.log("useEffect2 running")
        if (location.state){
            localStorage.setItem('model',location.state.model);
            localStorage.setItem('grade',location.state.grade);
            localStorage.setItem('color',location.state.color);
            localStorage.setItem('bed',location.state.bed);
            localStorage.setItem('price',location.state.price);
            setOrder(
                {model: localStorage.getItem('model'), 
                grade: localStorage.getItem('grade'),
                color: localStorage.getItem('color'),
                bed: localStorage.getItem('bed'),
                price: localStorage.getItem('price'),
                },  
            )
        } else if (localStorage.getItem('model') && !location.state){
            setOrder(
                {model: localStorage.getItem('model'), 
                grade: localStorage.getItem('grade'),
                color: localStorage.getItem('color'),
                bed: localStorage.getItem('bed'),
                price: localStorage.getItem('price'),
                },  
            )
            if (localStorage.getItem('model')){
                setActiveCampaignID(localStorage.getItem('ID'))
            }
        }
      }, [location]);
    const [formSent, setFormSent] = useState("");



    //google places functions
    const handleAddressSelect = async () => {
        let addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
        address1Ref.current.value = addressObj.address1;
        setValue("address1", addressObj.address1);
        setValue("location", `${addressObj.locality}, ${addressObj.adminArea1Long}`);
        setValue("country", addressObj.countryLong);
        setValue("postalCode", addressObj.postalCode);
        setFocus("address2");
    };

    useEffect(()=>{
        async function loadGoogleMaps() {
            // initialize the Google Place Autocomplete widget and bind it to an input element.
            // eslint-disable-next-line
            autoComplete = await googleAutoCompleteSvc.initAutoComplete(address1Ref.current, handleAddressSelect);
        }
        loadGoogleMaps();
    })
    const { handleSubmit: handleSubmit4, register: register4, setFocus, setValue, formState: { errors:errors4 } } = useForm({});

    const onSubmit4 = (data) => {
        fetch('/api/activeCampaignTags', {
            method: 'POST',
            body: JSON.stringify({
                ID: activeCampaignID,
                formStage: formStage,
            }),
            headers: {
              "content-type": `application/json`,
            },
        })
        .catch((error) => alert(error))
        console.log(errors4)
        setFormStage(3);
        setLocationData({address1: data.address1, address2: data.address2, city: data.location, postalCode: data.postalCode, country: data.country })
    }
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    //fileUploadForm code (netlify)
    function encode(data) {
        const formData = new FormData()
      
        for (const key of Object.keys(data)) {
          formData.append(key, data[key])
        }
      
        return formData
    }


    async function onSubmit(data){
        setFormSent("sending")
        
        //split location
        var array = locationData.city.split(',');
        var city = array[0];
        var region = array[1];
        //fetch activeCampaign for tag
        fetch('/api/activeCampaignTags', {
            method: 'POST',
            body: JSON.stringify({
                ID: activeCampaignID,
                formStage: formStage,
            }),
            headers: {
              "content-type": `application/json`,
            },
        })
        .catch((error) => alert(error))
        //fetch xero for invoice
        fetch(`/api/xero`, {
          method: `POST`,
          body: JSON.stringify({
            firstname: initialFormData.firstname,
            lastname: initialFormData.lastname,
            phone: initialFormData.phone,
            email: initialFormData.email,
            model: order.model,
            grade: order.grade,
            color: order.color,
            bed: order.bed,
            price: order.price,
            name: data.Name,
            companynumber: data.CompanyNumber,
            address1: locationData.address1,
            address2: locationData.address2,
            city: city,
            region: region,
            postalcode: locationData.postalCode,
            country: locationData.Country,
            companyTerm: data.CompanyTerm,
            personalTerm: data.personalTerm
        }),
          headers: {
            "content-type": `application/json`,
          },
        })
          .then(res => res.json())
          .then(body => {
            console.log(`response from API:`, body);
            // console.log("Response status: ", body.response.statusCode);
            if (body.response.statusCode === 200){
                console.log("sent!");
                setFormSent("sent");
                // navigate("/", {state: {formSent: true, model: location.state.model}});
                navigate("/invoice", {state: {body}})
            } else {
                console.log("error!", body)
                setFormSent("error");
            }
          })
      }


      const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm()
    //Updated for google places
   

    async function onSubmit2(data){
        setFormStage(1);
        setInitialFormData({firstname: data.FirstName, lastname: data.LastName, phone: data.Phone, email: data.Email});
        let build = (order.color + " " + order.model +" "+ order.grade +" "+ " bed option: "+ order.bed +" $"+ order.price)
        fetch(`/api/activeCampaign`, {
          method: `POST`,
          body: JSON.stringify({
            firstName: data.FirstName,
            lastName: data.LastName,
            phone: data.Phone,
            email: data.Email,
            order: build,
        }),
          headers: {
            "content-type": `application/json`,
          },
        })
          .then(res => res.json())
          .then(body => {
            console.log(`response from API:`, body);
            localStorage.setItem('ID',body);
            setActiveCampaignID(body)
          })
          .catch((error) => {
            console.log(error);console.log(errors2)})
      }
      let nf = new Intl.NumberFormat('en-US');

      //fileUploadForm code (netlify)
      const handleChange = (e) => {
        setFileUploadData({ ...fileUploadData, [e.target.name]: e.target.value })
      }
    
      const handleAttachment = (e) => {
        setFileUploadData({ ...fileUploadData, [e.target.name]: e.target.files[0] })
      }
    
      const handleSubmit3 = (e) => {
        e.preventDefault()
        //fetch activeCampaign with id & formStage?
        //create activeCampaign2 which will recieve these calls and add associated tag
        fetch('/api/activeCampaignTags', {
            method: 'POST',
            body: JSON.stringify({
                ID: activeCampaignID,
                formStage: formStage,
            }),
            headers: {
              "content-type": `application/json`,
            },
        })
        .catch((error) => alert(error))
        //file upload netli

        const form = e.target
        fetch('/', {
          method: 'POST',
          body: encode({
            'form-name': form.getAttribute('name'),
            ...fileUploadData,
          }),headers: {
            "content-type": `multipart/form-data`,
          },
        }).then(setFormStage(2))
          .catch((error) => alert(error))
        }


        console.log("Order: ",order)
    return(
        <Layout title="Order Page | Glacier International" invertNav={true}>
            <Container>
            <h1>Order Details:</h1>
            {/* Here I need to add check for cached model/build */}
            {order? 
            <div>
                <Flex>
                    <p>Model: {order.model} Grade: {order.grade} &nbsp;</p>
                    {order.bed === 0 ? <p>Bed & Cab: Regular (5.5ft)</p> 
                    : order.bed === 1 ? <p>Bed & Cab: Longbase (6.5ft)</p>
                    : null }
                    <p>Color: {order.color}</p>
                </Flex>
                <p>Total Price: ${nf.format(order.price)} (NZD)</p>
                <p>Deposit: ${(Number(order.price) * 0.75).toLocaleString()} (NZD)</p>
                <hr/>
                <p>Please enter your information below to receive your 75% deposit invoice of ${(Number(order.price) * 0.75).toLocaleString()} via email, and secure your custom Tundra build to be delivered by 4th quarter of 2023.</p>
            </div>
            :
            <div>
                <Flex>
                    <p>Model: loading Grade: loading &nbsp;</p>
                    <p>Bed & Cab: loading</p>
                    <p>Color: loading</p>
                </Flex>
                <p>Total Price: $loading (NZD)</p>
                <p>Deposit: $loading (NZD)</p>
                <hr/>
                <p>Please enter your information below to receive your 75% deposit invoice of $loading via email, and secure your custom Tundra build to be delivered by 4th quarter of 2023.</p>
                <p>If you have not come from the 'build your Tundra/Sequoia' page please <Link to="/">click here</Link></p>
            </div> 
            
            
            }
            
            {formStage === 0 ? 
            <div>
                {/* hidden form so file upload shows up in netlify dashboard */}
                <form 
                data-netlify="true" 
                name="file-upload" 
                method="post" 
                action="/thanks/" 
                data-netlify-honeypot="bot-field" 
                onSubmit={handleSubmit3} 
                hidden>
                    <div data-netlify-recaptcha="true"></div>
                    <p hidden>
                        <label>
                        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                        </label>
                    </p>
                    <label htmlFor="attachment">
                        <p hidden>Photo ID (Drivers Licence or Passport):</p>
                        <input 
                        hidden
                            onChange={handleAttachment}
                            type="file" 
                            name="attachment" 
                             required
                             accept="image/png, image/jpeg, image/jpg, image/gif"
                        />
                    </label>
                    <input type="hidden" name="form-name" value="file-upload" />
                    <button  hidden type="submit">Submit</button>
                </form>
                <form key={1} onSubmit={handleSubmit2(onSubmit2)}
                    id="autocomplete"
                >       
                            <div>
                                <label htmlFor="firstname">
                                        <p>First Name:</p>
                                        <input 
                                            type="text" 
                                            name="firstname" 
                                            required
                                            {...register2("FirstName", { required: true})}  
                                        />
                                </label>
                                <label htmlFor="lastname">
                                        <p>Last Name:</p>
                                        <input 
                                            type="text" 
                                            name="lastname" 
                                            required
                                            {...register2("LastName", { required: true})}  
                                        />
                                </label>
                            </div>
                            
                            <label htmlFor="phone">
                                <p>Phone Number:</p>
                                <input 
                                    type="phone" 
                                    name="phone" 
                                    required
                                    {...register2("Phone", { required: true})}
                                />
                            </label>                      
                        <label htmlFor="email">
                            <p>Email Address:</p>
                            <input 
                                type="email" 
                                name="email" 
                                required
                                {...register2("Email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                        </label>
                    
                        <button className="submitBtn" >Next</button>
                        {/* onClick={()=> {setFormStage(1)}} */}
                    </form>
                    </div>
                :  formStage === 1 ?     
                        <div>
                            <form key={2}>
                                <div>
                                    <label htmlFor="name">
                                            <p>Company Name:</p>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                required
                                                {...register("Name", { required: true})}  
                                            />
                                    </label>
                                    <label htmlFor="companynumber">
                                            <p>Company Registration Number:</p>
                                            <input 
                                                value={formStage === 0? "" : undefined}
                                                type="text" 
                                                name="companynumber" 
                                                required
                                                {...register("CompanyNumber", { required: true})}  
                                            />
                                    </label>
                                </div>
                        </form>
                        <form 
                            data-netlify="true" 
                            name="file-upload" 
                            method="post" 
                            action="/thanks/" 
                            data-netlify-honeypot="bot-field" 
                            onSubmit={handleSubmit3} 
                        >
                                        <p hidden>
                                            <label>
                                                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                            </label>
                                        </p>
                                        <label htmlFor="attachment">
                                            <p>Photo ID (Drivers Licence or Passport):</p>
                                            <input 
                                                onChange={handleAttachment}
                                                type="file" 
                                                name="attachment" 
                                                required
                                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                            />
                                         </label>
                                         <input type="hidden" name="form-name" value="file-upload" />
                                   
                                    <div className="buttonWrap">
                                        <button className="backBtn" onClick={()=> setFormStage(0)}>Back</button>
                                        <button type="submit">Next</button>
                                    </div>
                        </form>
                    </div>
                    : formStage === 2 ?   
                    <form key={3} onSubmit={handleSubmit4(onSubmit4)}>
                        
                    
                            <label htmlFor="addressline1">
                                <p>Address Line 1:</p>
                                <input 
                                    placeholder=""
                                    type="addressline1" 
                                    name="addressline1" 
                                    required
                                    {...register4("address1", { required: true})}
                                    ref={address1Ref}
                                />
                            </label>

                            <label htmlFor="addressline2">
                            
                                <p>Address Line 2:</p>
                                <input 
                                    placeholder=""
                                    type="addressline2" 
                                    name="addressline2" 
                                    {...register4("address2", { required: false})}
                                />
                            </label> 
                            
                                <label htmlFor="city">
                                <p>City, State/Province:</p>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-field"
                                    {...register4("location", { required: true })}
                                />
                                {errors.location && <span className="validation-error">Error: Location is required.</span>}
                                </label>
                            <div>
                                <label htmlFor="postalcode">
                                    <p>Postal Code:</p>
                                    <input 
                                        type="postalcode" 
                                        name="postalcode" 
                                        required
                                        {...register4("postalCode", { required: true})}
                                    />
                                </label>     
                                <label htmlFor="country">
                                    <p>Country:</p>
                                    <input 
                                        type="country" 
                                        name="country" 
                                        required
                                        {...register4("country", { required: true})}
                                    />
                                </label>  
                            </div>    
                            <div className="buttonWrap">
                                        <button className="backBtn" onClick={()=> setFormStage(1)}>Back</button>
                                        <button type="submit">Next</button>
                                    </div>
                            
                    </form>
                    : 
                    <form key={4} onSubmit={handleSubmit(onSubmit)}>
                    <h2>Purchasers Acknowledgement and Agreement</h2>
                    <p>
                        I acknowledge that I have read, understood, and agree to be bound by the <a href={TermsAndConditions} target="_blank">terms and conditions</a> attached to this Agreement.
                        If applicable, I acknowledge that I have been provided with a Consumer Information Notice (CIN) associated with the Vehicle and I have read, understand and accept the contents of the CIN.
                        I acknowledges that this offer to purchase will not be binding unless and until it is signed by Glacier International Limited.
                        I certify that the Vehicle is being acquired for the purposes of my business.
                    </p>
                    <div className="checkboxes">
                        <input type="radio"  value="Company" name="radio" {...register("CompanyTerm")} />
                        <label htmlFor="Company">Yes</label>
                        <input type="radio"  value="Personal" name="radio" {...register("CompanyTerm")} />
                        <label htmlFor="radio">No</label>
                    </div>
                    <p>
                    Important: If YES the parties agree that the provisions of the Consumer Guarantees Act 1993 will not apply
                    Agreed upon by Purchaser, Digital portal.
                    </p>
                    <div className="checkboxes">
                    <input type="checkbox" required name="accept2"></input>
                    <label htmlFor="accept2">Accept Terms</label>
                    </div>
                    <div className="buttonWrap">
                            <button className="backBtn" onClick={()=> setFormStage(1)}>Back</button>
                            <button 
                            type="submit" 
                            className="g-recaptcha"
                            data-sitekey="site_key"
                            data-callback='onSubmit'
                            data-action='submit'
                            >{formSent === "sending" ? "Order is Sending" : "Purchase Now"}</button>
                            </div>
                        
                        
                        {formSent === "sending"? <p className="submit-message">Your order is sending, please stay on page. We will redirect you to the invoice page once created.</p>
                        : formSent === "sent" ? <p className="submit-message">Order submitted, your deposit invoice will be with you shortly.</p>
                        : formSent === "error" ? <p className="submit-message">Sorry, there's been an error submitting your form. Please contact our support team at ceo@glacier.nz</p>
                        : <p></p>
                        }
                    </form>
                }
            </Container>
        </Layout>
    )
}