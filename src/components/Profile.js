import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs  } from 'firebase/firestore';
import { db } from '../firebase';
import { Table, Button } from 'react-bootstrap';


function Profile() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [tissueReferance, setTissueReferance] = useState('');
  const [libelle, setLibelle] = useState('');
  const [totalePrix, setTotalePrix] = useState('');
  const [avance, setAvance] = useState('');
  const [reste, setReste] = useState('');
  const [dateLivraison, setDateLivraison] = useState('');
  const [months, setMonths] = useState([]);
  const [montantAPayer, setMontantAPayer] = useState([]);
  const [leReste, setLeReste] = useState([]);


 
 
  const fetchClientData = useCallback(async () => {
    try {
      const docRef = doc(db, 'clients', clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClient(docSnap.data());
        setNom(docSnap.data().nom);
        setPrenom(docSnap.data().prenom);
        setTelephone(docSnap.data().telephone);
        setEmail(docSnap.data().email);
        setTissueReferance(docSnap.data().tissueReferance);
        setLibelle(docSnap.data().libelle);
        setTotalePrix(docSnap.data().totalePrix);
        setAvance(docSnap.data().avance);
        setReste(docSnap.data().reste);
        setDateLivraison(docSnap.data().dateLivraison);
      } else {
        console.log('No client found');
      }
    } catch (error) {
      console.log('Error retrieving client data:', error);
    }
  }, [clientId]);


  const fetchPaiementsData = useCallback(async () => {
    try {
      const paiementsRef = collection(db, 'paiements');
      const querySnapshot = await getDocs(paiementsRef);
      const paiementsData = querySnapshot.docs.map((doc) => doc.data());
      const monthsData = paiementsData.filter((data) => data.clientId == clientId);
      setMonths(monthsData);
    } catch (error) {
      console.log('Error retrieving paiements data:', error);
    }
  }, [clientId]);


  


  useEffect(() => {
    fetchClientData();
    fetchPaiementsData();

  }, [clientId, fetchClientData, fetchPaiementsData]);
   
  //--------- edit the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientDocRef = doc(db, 'clients', clientId);
      await updateDoc(clientDocRef, {
        nom,
        prenom,
        telephone,
        email,
        tissueReferance,
        libelle,
        totalePrix,
        avance,
        reste,
        dateLivraison,
        months,
        montantAPayer,
        leReste,
      });
      console.log('Client data updated successfully');
      await saveDataToFirebase(); // Save the data to Firebase

    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  // --------------- adding the code of the table
  const addColumn = () => {
    setMonths([...months, '']);
  };

  const handleMonthChange = (index, value) => {
    const updatedMonths = [...months];
    updatedMonths[index] = value;
  
    const updatedMontantAPayer = [...montantAPayer];
    updatedMontantAPayer[index] = '';
  
    const updatedLeReste = [...leReste];
    updatedLeReste[index] = '';
  
    setMonths(updatedMonths);
    setMontantAPayer(updatedMontantAPayer);
    setLeReste(updatedLeReste);
  };

  const saveDataToFirebase = async () => {
    try {
      const paiementsCollectionRef = collection(db, 'paiements');
      const newPaiementDocRef = await addDoc(paiementsCollectionRef, {
        clientId,
        months,
        montantAPayer,
        leReste,
      });
      console.log('Data saved to Firebase with document ID:', newPaiementDocRef.id);
    } catch (error) {
      console.log('Error saving data to Firebase:', error);
    }
  };
  
  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Client Profile</h2>
      <form onSubmit={handleSubmit}>

      <div>

      <div style={{padding: "50px 10px 0px 100px"}}>
        <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">Nom</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">Prenom</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>
        </div>
      
      <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">Tel</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">
            <label  class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">Tissue référence:</label>
            <div class="col-sm-10">
            <input type="text" class="form-control"  placeholder="Tissue référence" value={tissueReferance} onChange={(e) => setTissueReferance(e.target.value)} />
            </div>
        </div>

        <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">libelle Commande:</label>
            <div class="col-sm-10">
            <input type="text" class="form-control"  placeholder="libelle Commande" value={libelle} onChange={(e) => setLibelle(e.target.value)} />
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">      
            <div class="input-group mb-3  ">
                <label class="col-sm-2 col-form-label">Total prix:</label>
            
            <input type="number" class="form-control" value={totalePrix} onChange={(e) => setTotalePrix(e.target.value)}/>
                <div class="input-group-prepend">
                    <span class="input-group-text">DHS</span>
                </div>   
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">      
            <div class="input-group mb-3">
                <label class="col-sm-2 col-form-label">montant payé:</label>
            <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" value={avance} onChange={(e) => setAvance(e.target.value)}/>
                <div class="input-group-prepend">
                    <span class="input-group-text">DHS</span>
                </div>   
            </div>
        </div>
      
        <div class="form-group row col-7 mt-3">      
            <div class="input-group mb-3">
                <label class="col-sm-2 col-form-label">Reste:</label>
            <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" value={reste} onChange={(e) => setReste(e.target.value)}/>
                <div class="input-group-prepend">
                    <span class="input-group-text">DHS</span>
                </div>   
            </div>
        </div>      
      
      <div class="form-group row col-7 mt-3">      
            <div class="input-group mb-3">
                <label class="col-sm-2 col-form-label">Date livraison:</label>
            <input type="date" class="form-control" aria-label="Amount (to the nearest dollar)" value={dateLivraison} onChange={(e) => setDateLivraison(e.target.value)}/> 
            </div>
        </div> 
      
      <div class="form-group row col-7 mt-3">      
            <div class="input-group mb-3">
                <label class="col-sm-2 col-form-label">Image :</label>
            <input type="file" class="form-control-file" /> 
            </div>  
        </div>
      
      <button type="submit" class="btn btn-outline-primary col-2 mt-2 btn-lg btn-block">Submit</button>
  </div>

      </div>
      </form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Mois</th>
            <th>Montant à Payer</th>
            <th>Le Reste</th>
          </tr>
        </thead>
        <tbody>
  {months.map((month, index) => (
    <tr key={index}>
      <td>
        <select
          className="form-control"
          value={month.months[ index ] || ' '}

          onChange={(e) => handleMonthChange(index, e.target.value)}
        >
                    <option value="">Choose a month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          value={month.montantAPayer[ index ] || ' '}
          onChange={(e) => {
            const updatedMontantAPayer = [...montantAPayer];
            updatedMontantAPayer[index] = e.target.value;
            setMontantAPayer(updatedMontantAPayer);
          }}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          value={month.leReste[ index ] || ' '}
          onChange={(e) => {
            const updatedLeReste = [...leReste];
            updatedLeReste[index] = e.target.value;
            setLeReste(updatedLeReste);
          }}
        />
      </td>
    </tr>
  ))}
</tbody>
      </Table>
      <Button onClick={addColumn}>Add Column</Button>

    </div>
  );
}

export default Profile;