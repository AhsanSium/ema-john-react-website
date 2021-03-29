import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';
import './Shipment.css';


const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    console.log(watch("example"));

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phoneNo" ref={register({ required: true })} />
            {errors.phoneNo && <span className="error">Phone Number is required</span>}

            <input name="zip" ref={register({ required: true })} />
            {errors.zip && <span className="error">Zip Code is required</span>}
            
            <input type="submit" />
        </form>
    );
};

export default Shipment;