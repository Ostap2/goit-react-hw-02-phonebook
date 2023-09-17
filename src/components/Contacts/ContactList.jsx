import React from 'react';

function ContactList({ contacts, deleteContact }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
