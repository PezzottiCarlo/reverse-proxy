import './App.css';
import { useState, useEffect } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import Swal from 'sweetalert2'
import Service from './component/Service/Service';


function App() {

  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const filerChange = (event) => {
    setFilter(event.target.value);
  }

  const fetchData = async () => {
    const result = await fetch('list');
    const json = await result.json();
    setServices(json);
  };

  const filteredData = () => {
    if (filter === '') {
      return services;
    }
    return services.filter(service => {
      return service.hostname.toLowerCase().includes(filter.toLowerCase())
    })
  }

  const showAddDialog = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Multiple inputs',
      html:
        '<div class="add-dialog">'+
          '<p>Hostname:</p>'+
          '<input id="hostname" class="swal2-input">' +
        '</div>'+
        '<div class="add-dialog">'+
          '<p>Target:</p>'+
          '<input id="target" class="swal2-input">' +
        '</div>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          hostname:document.getElementById('hostname').value,
          target:document.getElementById('target').value
        }
      }
    })
    if((await addService(formValues))){
      Swal.fire('Added!', 'Your service has been added.', 'success')
      fetchData();
    }
  }

  const addService = async (data) => {
    let res = await fetch('add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let json = await res.json();
    return json.success;
  }

  const updateServices = () => {
    fetchData();
  }


  return (
    <div className="App">
      <div className="service-manage">
        <div className="service-bar">
          <div className="service-bar-search">
            <input value={filter} onChange={filerChange} type="text" placeholder="Search" />
          </div>
        </div>
        <div className="service-list">
          {
            filteredData().map((service, index) => {
              service.index = index;
              return (
                <div className="service-container">
                  <Service service={service} callback={updateServices} />
                </div>
              )
            })
          }
        </div>
        <div className="service-bar">
          <div className="service-bar-button">
            <button className='add-icon' onClick={showAddDialog}><FiPlusCircle /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
