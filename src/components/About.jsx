import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-20">
            <h2 className="text-2xl font-bold mb-2">À propos de Nous</h2>
            <p className="text-gray-700">
                Bienvenue sur [Nom du Site], votre destination numéro un pour tous les produits [type de produits]. Nous sommes dédiés à vous donner le meilleur des [type de produits], avec un accent sur [trois caractéristiques uniques, par exemple: la fiabilité, la variété des produits, le service client].
            </p>
            <p className="text-gray-700 mt-4">
                Fondé en [année] par [Nom du Fondateur], [Nom du Site] a parcouru un long chemin depuis ses débuts dans [lieu de départ]. Lorsque [Nom du Fondateur] a commencé, son enthousiasme pour [raison de démarrer l'entreprise, par exemple 'fournir le meilleur équipement de sport pour la communauté'] l'a poussé à [action qu'il/elle a faite, par exemple 'faire des recherches intensives, quitter son travail quotidien'] et a donné l'impulsion pour transformer le travail acharné et l'inspiration en un magasin en ligne en plein essor.
            </p>
            <p className="text-gray-700 mt-4">
                Nous espérons que vous apprécierez nos produits autant que nous aimons les offrir. Si vous avez des questions ou des commentaires, n'hésitez pas à nous contacter.
            </p>

            <p className="text-gray-700 mt-4">
                Sincèrement,<br/>
                [Nom du Fondateur]
            </p>
        </div>
    );
};

export default About;
