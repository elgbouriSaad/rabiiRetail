import React, { useState } from 'react';

function Model() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [tissueReferance, setTissueReferance] = useState('');
  const [totalePrix, setTotalePrix] = useState('');
  const [avance, setAvance] = useState('');
  const [reste, setReste] = useState('');
  const [dateLivraison, setDateLivraison] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  return (

  <form onSubmit={handleSubmit} class="container">
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
            <input type="file" class="form-control-file"  onChange={handleImageChange}/> 
            </div>
        </div>
      
      <button type="submit" class="btn btn-outline-primary col-2 mt-2 btn-lg btn-block" onChange={handleSubmit}>Submit</button>
  </div>
  </form>
  );
}
export default Model;