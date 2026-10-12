import { useEffect, useState } from "react";

import ContactsList from "./ContactsList";
import styles from "./Contacts.module.css";
import inputs from "../Constants/input";
import { v4 } from "uuid";

const STORAGE_KEY = "contact-app-contacts";

const emptyContact = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
};

function Contacts() {
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem(STORAGE_KEY);
      return savedContacts ? JSON.parse(savedContacts) : [];
    } catch {
      return [];
    }
  });
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState(emptyContact);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch {
      setAlert("Could not save contacts in this browser.");
    }
  }, [contacts]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((currentContact) => ({ ...currentContact, [name]: value }));
    if (alert) setAlert("");
  };

  const addHandler = (event) => {
    event.preventDefault();

    const cleanedContact = {
      name: contact.name.trim(),
      lastname: contact.lastname.trim(),
      email: contact.email.trim().toLowerCase(),
      phone: contact.phone.trim(),
    };

    if (
      !cleanedContact.name ||
      !cleanedContact.lastname ||
      !cleanedContact.email ||
      !cleanedContact.phone
    ) {
      setAlert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanedContact.email)) {
      setAlert("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^\+?[\d\s()-]{7,20}$/;
    if (!phonePattern.test(cleanedContact.phone)) {
      setAlert("Please enter a valid phone number.");
      return;
    }

    if (
      contacts.some(
        (savedContact) => savedContact.email.toLowerCase() === cleanedContact.email,
      )
    ) {
      setAlert("A contact with this email already exists.");
      return;
    }

    setContacts((currentContacts) => [
      ...currentContacts,
      { ...cleanedContact, id: v4() },
    ]);
    setContact(emptyContact);
    setAlert("");
  };

  const deleteHandler = (id) => {
    setContacts((currentContacts) =>
      currentContacts.filter((savedContact) => savedContact.id !== id),
    );
    setAlert("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={addHandler}>
        {inputs.map((input) => (
          <input
            key={input.name}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
            autoComplete={input.autoComplete}
            aria-label={input.placeholder}
          />
        ))}
        <button type="submit">Add Contact</button>
      </form>
      <div className={styles.alert} role="status" aria-live="polite">
        {alert && <p>{alert}</p>}
      </div>
      <ContactsList contacts={contacts} deleteHandler={deleteHandler} />
    </div>
  );
}

export default Contacts;
