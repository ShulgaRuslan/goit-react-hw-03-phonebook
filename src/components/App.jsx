import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from './ContactList/Contactlist'; 
import { Component } from "react";
import { Filter } from "./Filter/Filter";



export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }
  onSubmitHandler = data => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  filterContacts = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  filterList = () => {
    const filteredList = this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredList;
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts } = this.state;
    const checkName = contacts.map(contact => contact.name);
    return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: '#061b85'
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h1 style={{ marginBottom: '20px'}}>Phonebook</h1>
        <ContactForm
        onSubmit={this.onSubmitHandler}
        checkName={checkName}/>
        <h2 style={{ marginBottom: '20px'}}>Contacts</h2>
        <Filter
        filter={this.state.filter}
        onFilterChange={this.filterContacts}/>
        <ContactList
        data={this.filterList()}
        onDeleteContact={this.handleDeleteContact}
        />
      </div>
    </div>
  )};
}
