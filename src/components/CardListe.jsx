import React from 'react';
import Card from './Card';

function CardList({produits} ){
    return(
<div className="grid grid-cols-5 gap-4">
      {produits.map(produit => <Card key={produits._id} produit={produit} />)}
    </div>

 );
}
    export default CardList;