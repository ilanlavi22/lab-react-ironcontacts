import contacts from '../contacts.json';
import { useState } from 'react';

const ContactList = () => {
  const [data, setData] = useState(contacts.slice(0, 5));
  //let [message, setMessage] = useState("");

  // Functions
  const sortByName = () => {
    setData((contact) =>
      contact.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  };

  const sortByPopularity = () => {
    setData((contact) =>
      contact.slice().sort((a, b) => {
        return b.popularity - a.popularity;
      })
    );
  };

  const contactDeleteHandle = (id) => {
    const newContactsArray = data.filter((contact) => {
      return contact.id !== id;
    });
    setData(newContactsArray);
  };

  const contactAddRandom = () => {

    // get the contacts that are not already in the array
    const newContacts = contacts.filter((contact) => {
      return !data.includes(contact);
    });

    if (newContacts.length) {
      const randomIndex = Math.floor(newContacts.length * Math.random());
      const randomContact = newContacts[randomIndex];
      setData([...data, randomContact]);
    }
  }

  // my prev solution /////////////
  //   let contactRandom = contacts[Math.floor(Math.random() * contacts.length)];
  //   let inList = true;

  //   for (let i = 0; i < data.length; i++) {
  //     inList = false;

  //     if (contactRandom.id.toString() === data[i].id.toString()) {
  //       inList = true;
  //       setMessage("Contact is already in the list ... skipping...");
  //       return;
  //     } else {
  //       setMessage("New Contact has been added");
  //     }
  //   }

  //   setData([...data, contactRandom]);
  // };

  return (
    <div className='contacts-list'>
      {/* <div className='message-container'><h3>{message && message}</h3></div> */}
      <div className='table-actions'>
        <button className='btn' onClick={sortByName}>Sort by name</button>
        <button className='btn' onClick={sortByPopularity}>Sort by popularity</button>
        <button className='btn' onClick={contactAddRandom}>Add Random Contact</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {data.map((contact) => {
            const { id, pictureUrl, name, popularity, wonOscar, wonEmmy } = contact;
            return (
              <tr key={id}>
                <td className='mw100'><img src={pictureUrl} alt={name} /></td>
                <td className='mw150'>{name}</td>
                <td className='mw100'>{popularity.toString().slice(0, -4)}</td>
                <td>{wonOscar && '🏆'}</td>
                <td>{wonEmmy && '🏆'}</td>
                <td className='mw150'>
                  <button className='btn' onClick={() => contactDeleteHandle(id)}>Delete</button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}

export default ContactList;