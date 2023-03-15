import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
//import { useAuth0 } from '../../contexts/auth0-context';

function Create(): JSX.Element 
{
  let navigate = useNavigate();
  //const { user, getIdTokenClaims } = useAuth0();
  
  interface IValues {
      [key: string]: any;
  }
  const [author, setAuthor] = useState<string>('');
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  /*
  useEffect(() => {
      if (user) {
      setAuthor(user.name)
      }
  } , [user])
  */
  
  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      const formData = {
        id: uuidv4(),
        transactionType: values.transactionType,
        transactionDate: values.transactionDate,
        productDescription: values.productDescriptio,
        transactionValue: values.transactionValue,
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
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
          //"authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(formData)
      });
      return response.ok;
    } catch (ex) {
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
            <input type="text" id="transactionDate" onChange={(e) => handleInputChanges(e)} name="transactionDate" className="form-control" placeholder="Enter transactionDate" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="transactionValue"> Transaction Value </label>
            <input type="text" id="transactionValue" onChange={(e) => handleInputChanges(e)} name="transactionValue" className="form-control" placeholder="Enter transactionValue" />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="sellerName"> Seller Name </label>
            <input type="text" id="sellerName" defaultValue={author} onChange={(e) => handleInputChanges(e)} name="sellerName" className="form-control" placeholder="Enter sellerName"/>
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