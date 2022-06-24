import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,signInwithGooglePopup,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form.input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    
    email :'',
    password: '',
  
    



}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

 

const resetFormFields = () =>{
    setFormFields(defaultFormFields);
};

const signInWithGoogle = async() =>{
    const {user} = await signInwithGooglePopup();
    await createUserDocumentFromAuth(user);
};


    const handleSubmit = async (event) =>{
        event.preventDefault();

        

        try{
        const response = await signInAuthUserWithEmailAndPassword(email, password)
        console.log(response);
        resetFormFields();
        } 
        catch(error){
        
        switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password for email')
                break;
            case 'auth/user-not-found':
                alert('no user associated with this email')   
                break;
            default:
                console.log(error)
        }            
        }

    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
        //  the ... operator copies/sets all the rest values
    };

    return(
        <div className="sign-up-container"> 
        <h2>already have an account?</h2>
            <span> Sign in with Email & Password </span>

            <form action="" onSubmit={ handleSubmit }>
               
                <FormInput label="Email" type="email" required name="" id="" onChange={handleChange} name = "email" value = { email } />
                
                <FormInput label="Password" type="password" required name="" id="" onChange={handleChange} name = "password" value = { password } />

                <div className="buttons-container">
                    <Button type = "submit" >SIGN IN</Button>
                    <Button type='button' buttonType = "google" onClick={signInWithGoogle} >GOOGLE SIGN IN</Button>

                </div>
                
              
            </form>
        </div>
    )
}


export default SignInForm;