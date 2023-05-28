import React, { useState } from 'react';
import { db, storage } from '../firebase';
import 'firebase/firestore';
import 'firebase/storage';


function Model() {
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
  const [imgFile, setImgFile] = useState(new File([], ""));
  const [imgUrl, setImgUrl] = useState(null);
const [userData, setUserData] = useState([]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        // Create a new document in the "users" collection with the form data
        const docRef = await db.collection('clients').add({
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
        });

        if (imgFile) {
            const imageRef = storage.ref(`${docRef.id}.png`);
            await imageRef.put(imgFile);
            const imgUrl = await imageRef.getDownloadURL();
            setImgUrl(imgUrl);
          }

         // Upload the image to Cloud Storage
    //     const imageRef = ref(storage, `${useAuth.user.uid}.png`);
    //         uploadBytes(imageRef, imgFile)
    //           .then(() => {
    //             getDownloadURL(imageRef)
    //               .then((url) => {
    //                 setUrl(url);
    //               })
    //               .catch((error) => {
    //                 console.log(error.message, "error getting the image url");
    //               });
    //             setImage(null);
    //             console.log("paoziepaoziepo",useAuth.user.uid);
    //              navigate(`/profile?uid=${useAuth.user.uid}`);
    //           })
    //           .catch((error) => {
    //             console.log(error.message, "error uploading the image");
    //           });

         alert('Data submitted successfully!');
       } catch (error) {
         console.log('Error submitting data:', error);
         alert('An error occurred while submitting the data.');
    }


};

const handleImageChange = async(e) => {
    const file = e.target.files[0];
    setImgFile(file);

};

  return (

  <form onSubmit={handleSubmit} class="container">
  <div style={{padding: "50px 10px 0px 100px"}}>
        <div class="form-group row col-7 mt-3">
            <label class="col-sm-2 col-form-label">Nom</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" placeholder="nom" value={userData?.nom} onChange={(e) => setNom(e.target.value)} />
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
                <label class="col-sm-2 col-form-label">Avance:</label>
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
            <input type="file" class="form-control-file" onChange={handleImageChange} /> 
            </div>  
        </div>
      
      <button type="submit" class="btn btn-outline-primary col-2 mt-2 btn-lg btn-block">Submit</button>
  </div>
  </form>
  );
}
export default Model;