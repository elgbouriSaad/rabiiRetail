import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';




function Home() {
    const [clients, setClients] = useState([]);
  
    useEffect(() => {
      fetchClients();
    }, []);
  
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clients'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClients(data);
      } catch (error) {
        console.log('Error retrieving clients:', error);
      }
    };
  
    return (
      <div className="container">
        <h2>Clients</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Tissue Référence</th>
              <th>Total Prix</th>
              <th>Avance</th>
              <th>Reste</th>
              <th>Date Livraison</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.telephone}</td>
                <td>{client.email}</td>
                <td>{client.tissueReferance}</td>
                <td>{client.totalePrix}</td>
                <td>{client.avance}</td>
                <td>{client.reste}</td>
                <td>{client.dateLivraison}</td>
                <td>
                <Link to={`/model/${client.id}`} className="btn btn-primary">
                  View Profile
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Home;