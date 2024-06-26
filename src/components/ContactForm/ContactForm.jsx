import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useId } from "react";
import * as Yup from "yup";
import { apiAddNewUserContact } from "../../redux/contacts/operations";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(15, "Too Long!")
    .required("Number is required"),
});

const initialValues = {
  name: "",
  number: "",
};

const contacts = [
  { name: "John Doe", number: "123-45-67" },
  { name: "Jane Smith", number: "234-56-78" },
  { name: "Alice Johnson", number: "345-67-89" },
  { name: "Bob Brown", number: "456-78-90" },
];

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(apiAddNewUserContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor={nameId}>
            Name
          </label>

          <Field
            className={css.field}
            type='text'
            name='name'
            id={nameId}
            placeholder='Enter name'
            list='usernameList'
            autoComplete='off'
          />

          <datalist id='usernameList'>
            {contacts.map(({ name }, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>

          <ErrorMessage
            name='name'
            component='span'
            className={css.contactError}
          ></ErrorMessage>
        </div>

        <div className={css.inputWrapper}>
          <label className={css.label} htmlFor={numberId}>
            Number
          </label>

          <Field
            className={css.field}
            type='text'
            name='number'
            id={numberId}
            placeholder='Enter number'
            list='numberList'
            autoComplete='off'
          />

          <datalist id='numberList'>
            {contacts.map(({ number }, index) => (
              <option key={index} value={number} />
            ))}
          </datalist>

          <ErrorMessage
            name='number'
            component='span'
            className={css.contactError}
          ></ErrorMessage>
        </div>
        <button className={css.submitBtn} type='submit'>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;