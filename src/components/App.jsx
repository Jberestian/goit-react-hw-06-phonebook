import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from 'redux/items/items-action';

import { setFilter } from 'redux/filter/filter-action';
import { getFilter } from 'redux/filter/filter-selector';
import { getContacts } from 'redux/items/items-selector';

import ContactBook from './ContactBook/ContactBook';
import Filter from './Filter/Filter';
import Form from './Form/Form';

const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onAddContacts = ({ name, number }) => {
    const action = addContact(name, number);
    const arrayOfName = contacts && contacts.map(contact => contact.name);
    if (arrayOfName && arrayOfName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(action);
  };

  const onRemoveContacts = contact_id => {
    dispatch(removeContact(contact_id));
  };

  const getFiltredContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    const filterContacts =
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter)
      );
    return filterContacts;
  };

  const filtredArray = getFiltredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContacts} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={event => dispatch(setFilter(event.currentTarget.value))}
      />
      <ContactBook contacts={filtredArray} removeContact={onRemoveContacts} />
    </div>
  );
};

export default App;
