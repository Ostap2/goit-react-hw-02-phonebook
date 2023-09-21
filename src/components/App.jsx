// App.js
import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './Contacts/ContactForm';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';
import '../index.css';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
  
    if (name === '' || number === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    if (this.state.contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
  
    const contact = {
      id: shortid.generate(), // Генеруємо унікальний id для контакта
      name,
      number,
    };
  
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
      name: '',
      number: '',
    }));
  };
  
  

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  deleteContact = (contactIndex) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((_, index) => index !== contactIndex),
    }));
  };
  
  
  addContact = (newContact) => {

    const isDuplicateName = this.state.contacts.some(
      (contact) => contact.name === newContact.name
    );

    if (isDuplicateName) {
      console.log('Це імя вже існує');
      return; 
    }

    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  render() {
    const { name, number, filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          onSubmit={this.addContact}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
