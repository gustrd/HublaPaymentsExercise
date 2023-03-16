import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify';
import fetch from 'cross-fetch';
import 'react-toastify/dist/ReactToastify.css';

//import { useAuth0 } from '../../contexts/auth0-context';

import "react-datepicker/dist/react-datepicker.css";

function Create(): JSX.Element 
{
  let navigate = useNavigate();
  //const { user, getIdTokenClaims } = useAuth0();
  
  interface IValues {
      [key: string]: any;
  }
  const [values, setValues] = useState<IValues>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      const formData = {
        id: uuidv4(),
        transactionType: parseInt(values.transactionType),
        transactionDate: selectedDate,
        productDescription: values.productDescription,
        transactionValue: parseFloat(values.transactionValue),
        sellerName: values.sellerName
      }
      const submitSuccess: boolean = await submitform(formData);
      setSubmitSuccess(submitSuccess);
      setValues({...values, formData});
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
      
  const submitform = async (formData: {}) => {
    try {
      //const accessToken = await getIdTokenClaims();
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/transaction`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json",
          
          //"authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(formData),
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: 'cors',
        credentials: "include"
      });

      if (response.ok){
        toast("Transaction registered with sucess.");
        return true;
      }
      else{
        toast("There was an error when registering your transaction.");
        return false;
      }
    } catch (ex) {
        toast("There was an error when registering your transaction.");
      return false;
    }
  }

  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <div>
      <div className={"col-md-12 form-wrapper"}>
        <h2> Create Transaction </h2>
        {!submitSuccess && (
          <div className="alert alert-info" role="alert">
            Fill the form below to register a new transaction.
          </div>
        )}
        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}

        <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
          <div className="form-group col-md-12">
            <label htmlFor="transactionType"> Transaction Type </label>
            <input type="text" id="transactionType" onChange={(e) => handleInputChanges(e)} name="transactionType" className="form-control" placeholder="Enter transactionType" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="transactionDate"> Transaction Date </label>
            <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="transactionValue"> Transaction Value </label>
            <input type="text" id="transactionValue" onChange={(e) => handleInputChanges(e)} name="transactionValue" className="form-control" placeholder="Enter transactionValue" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="sellerName"> Seller Name </label>
            <input type="text" id="sellerName" onChange={(e) => handleInputChanges(e)} name="sellerName" className="form-control" placeholder="Enter sellerName"/>
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="productDescription"> Product Description </label>
            <input type="text" id="productDescription" onChange={(e) => handleInputChanges(e)} name="productDescription" className="form-control" placeholder="Enter productDescription"/>
          </div>
          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Register Transaction
            </button>
            {loading &&
              <span className="fa fa-circle-o-notch fa-spin" />
            }
          </div>
        </form>
      </div>
    </div>
  );
         
}

export default (Create)