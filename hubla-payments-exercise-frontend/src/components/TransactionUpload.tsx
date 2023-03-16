import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-datepicker/dist/react-datepicker.css';

function TransactionUploadForm(): JSX.Element {
  let navigate = useNavigate();

  interface IValues {
    [key: string]: any;
  }

  const [values, setValues] = useState<IValues>({});
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit  = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file', values.file);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/transaction/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
        referrerPolicy: 'strict-origin-when-cross-origin',
        mode: 'cors',
        credentials: 'include',
      });

      if (response.ok) {
        toast('Transaction registered with success.');
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast('There was an error when registering your transaction.');
      }
    } catch (ex) {
      toast('There was an error when registering your transaction.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setValues({ ...values, file: e.currentTarget.files[0] });
    } else {
      setValues({ ...values, file: undefined });
    }
  };

  return (
    <div>
        <div className={'col-md-12 form-wrapper'}>
            <h2>Create Transaction File Upload</h2>
            {!submitSuccess && (
            <div className='alert alert-info' role='alert'>
                Fill the form below to register a new transaction file upload.
            </div>
            )}
            {submitSuccess && (
            <div className='alert alert-info' role='alert'>
                The file was successfully submitted!
            </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="file">Choose a file:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                <button type="submit">Upload</button>
            </form>
        </div>
    </div>);
}
export default TransactionUploadForm;
