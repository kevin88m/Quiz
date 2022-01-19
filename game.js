
const question = document.getElementById('question');
//je prend la variable de mon Id question;
const checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
//

const choices = Array.from(document.getElementsByClassName('choice-text'));
//je rentre un tableau dans ma variable pour avoir les quatre choix;
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
//je gère dynamiquement le score et la progression des questions aleatoire.;
const progressBarFull = document.getElementById('progressBarFull');
const answer = document.querySelector(".answer-description");




let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
//j'établis une variable pour choisir les questions;
let availableQuestions = [];
//je créer une copie de l'ensemble de mon array pour ajouter des questions;

let questions = [
    {   
        
        "question": "The Witcher : Dans le premier épisode, pourquoi Geralt de Riv a-t-il tué Renfri ?",
        "choice1": "Renfri était une meurtrière engagée par la Winn",
        "choice2": "Renfri était en réalité une brouxe assoiffée de sang",
        "choice3": "Renfri avait pour objectif d'assassiner le mage Stregobor",
        "choice4": "Renfri était en réalité une strige",
        "answer": 3,
        "description":"la bonne réponse est la 3:Renfri était une princesse maudite, pourchassée par le mage Stregobor. Pour se venger de lui, cette dernière avait donc décidé de le tuer. Voulant éviter un bain de sang, Geralt avait alors tenté de raisonner la jeune femme, lui laissant une chance de quitter la ville vivante. Une proposition qu'elle a déclinée, préférant croiser le fer avec le Sorceleur, ce qui a fini par lui coûter la vie.",
    },

    {   
        
        "question": "Breaking Bad : Dans la deuxième saison , Comment s'appelle l'homme de main de Tuco écrasé par une voiture ? ",
        "choice1": "Lonzo",
        "choice2": "Ronzo",
        "choice3": "Gonzo",
        "choice4": "Donzo",
        "answer": 3,
        "description":"'Gonzo' Gonzalez était le beau-frère de Tuco Salamanca et l'un de ses lieutenants. ",
    },

    {   
        
        "question": "Squid Game : Combien de minutes ont été accordées aux joueurs du jeu de verre pour traverser le pont ?",
        "choice1": "12 minutes",
        "choice2": "16 minutes",
        "choice3": "18 minutes",
        "choice4": "14 minutes",
        "answer": 2,
        "description":"la bonne réponse est 16 minutes, Une vidéo des coulisses publiée par la production a révélé que le pont de verre original était réel et qu’il était installé à un peu plus d’un mètre du sol, avec des matelas au sol pour les cas de chute. C’est pourquoi les acteurs ont eu très peur pendant le tournage de la scène.",
    },

    {   
       
        "question": "peaky Blinders :  Quelle est le nom du pub des  Peaky Blinders?",
        "choice1": "The Black Horse",
        "choice2": "The Rose and Crown  ",
        "choice3": "The Travellers' Rest",
        "choice4": "The Garrison pub",
        "answer": 4,
       "description":"dans la série 2, Thomas Shelby a acheté le Garisson pub à Harry et Arthur Shelby Jr. est devenu le propriétaire, même si Harry y travaillait toujours. Le pub a ensuite explosé dans le cadre du plan de Tommy, avant d'être reconstruit à nouveau. ",
    },

    {   
        
        "question": " Game of throne :  Dans quelle saison Arya tue-t-elle Walder Frey ",
        "choice1": "Saison 6",
        "choice2": "Saison 4",
        "choice3": "Saison 3",
        "choice4": "saison 5",
        "answer": 1,
        "description":"La bonne réponse est la saison 6:Durant la saison 7, Arya Stark se venge de Walder Frey pour le massacre des Stark lors des 'noces pourpres', en le tuant puis en décimant l'intégralité de sa famille. Apprenant ensuite que Jon Snow est à la tête de Winterfell, elle décide de s'y rendre.",
    },

    {   
        
        "question": "Vikings :  Pourquoi Bjorn s'appelait-il côte de fer ?",
        "choice1": "Il se bat bien.",
        "choice2": "Aucune lame ne l'atteint.",
        "choice3": "Il n'a pris aucune cicatrice durant la bataille ",
        "choice4": "Il a la peau dure",
        "answer": 2,
        "description":"Son père, Ragnar, l'a nommé Ironside parce qu'aucune lame, hache ou lance ne pouvait le toucher dans une bataille contre le roi Ecber",
    },

    {   
       
        "question": " Ozark : Marty achète deux entreprises pour l'aider à blanchir de l'argent. L'un est le restaurant/marina Blue Cat ; quel est l'autre?",
        "choice1": "Hog Heaven",
        "choice2": "Magic Dragon",
        "choice3": "Lickety Splitz",
        "choice4": "Tastee Freeze",
        "answer": 3,
        "description":"La bonne réponse était Lickety SplitzLickety Splitz est un club pour hommes, mieux connu sous le nom de club de strip-tease, ou d'autres termes encore moins savoureux. La règle n°1 du blanchiment d'argent consiste à utiliser des entreprises qui traitent en espèces, comme le font les deux choix de Marty. Le sens des affaires de Marty tourne autour du Blue Cat défaillant, et sa cruauté impitoyable lui permet de devenir propriétaire de Lickety Splitz, et plus qu'il ne l'avait prévu.",
    },

    {   
        
        "question": "Startup :  Quelle est la monnaie virtuelle qui a été crée par izzy Morales ?",
        "choice1": "le Rentainer",
        "choice2": "le Fardano",
        "choice3": "le Gencoin",
        "choice4": "le Localcoin",
        "answer": 3,
        "description":"Izzy peine à trouver des financements pour sa start-up visionnaire GenCoin. Nick (banquier) décide d'investir dans le projet avec de l'argent blanchi par son père."
    },

    {   
        
        "question": "Mr Robot : Que disait le fichier fsociety.dat ? ?",
        "choice1": "DON'T TELL ANYONE",
        "choice2": "LEAVE ME HERE",
        "choice3": "KEEP THIS SAFE",
        "choice4": "DON'T DELETE ME",
        "answer": 2,
        "description":"fsociety (groupe de hackers basé à Coney Island, à New York ) est responsable de l'attaque du service DDoS qui a mis hors ligne E Corp. Après l'attaque, Elliot a trouvé un fichier sur l'un des serveursd' E Corp de la par d'fsociety. Plutôt que de supprimer le fichier, Elliot a modifié les autorisations d'accès au dossier pour en avoir accès.",
    },

    {   
        
        "question": "Brassic : Quelle est la couleur peinte sur le poney du Shetland qui a été volée par le groupe de vinnie ? ?",
        "choice1": "Noire",
        "choice2": "Blanc",
        "choice3": "marron",
        "choice4": "Gris",
        "answer": 1,
        "description":"Quand Vinnie et ses gars sont contraints de voler un poney Shetland noir pour Jim, le fermier xénophobe qui veut éclipser son voisin étranger  au concours hippique de cette année.Le titre, raccourci de « Boracic lint », est du rhyming slang pour « skint »(faûché) . ",
    },

    {   
        
        "question": "Brooklynn Nine Nine : Qui a dit:'“Si on s’éloigne de notre bureau pendant trop longtemps, ils vont mettre à jour nos ordinateurs et on n’aura plus le Démineur”.",
        "choice1": "Terry",
        "choice2": "Hitchcock",
        "choice3": "Amy",
        "choice4": "Scully",
        "answer": 4,
        "description":"Ce qu’aiment Scully et Hitchcock par-dessus tout, c’est de ne rien faire. Alors quand les deux plus vieux inspecteurs du poste de police doivent mener une enquête avec Boyle, ces deux-là sont un peu réticents. Eux, ce qu’ils voudraient, c’est rester à leur place et manger des pizzas, des donuts, ou un tout autre plat plein de saveurs. Mais Scully dévoile également une autre raison au fait qu’ils soient très réticents à partir sur le terrain. ",
    },

    {   
        
        "question": "Blacklist : Dans le premier épisode, l'un des plus recherchés du FBI est appréhendé. Comment le FBI a-t-il exactement attrapé le fugitif Raymond Reddington ?",
        "choice1": "L'un de ses passeports a été signalé dans un aéroport. ",
        "choice2": "Il s'est rendu à eux",
        "choice3": "La reconnaissance faciale l'a détecté lors d'un événement sportif.",
        "choice4": "Son ex-femme a informé les autorités après l'avoir contactée. ",
        "answer": 2,
        "description":"Il voulait faire affaire en compagnie de la profileuse Elisabeth keen dont il connaissait la mère."
    },

    {   
        
        "question": "Sons Of Anarchy :Qui est l'écossais du club ?",
        "choice1": "Piney Winston",
        "choice2": "Bobby Munson",
        "choice3": "Chibs Telford",
        "choice4": "Liam O'neil",
        "answer": 3,
        "description":"Filip Chibs Telford est incarné par Tommy Flanagan qui est réelement écossais et faisant une apparition dans le clip de Korn 'Rotting in vain'.",
    },

    {   
        
        "question": "La Casa De Papel  :  Le nom du professeur a été révélé plus tard et comment s'appelait-il ?",
        "choice1": "Sergio Marquina ",
        "choice2": "Aníbal Cortés",
        "choice3": "Andrés de Fonollosa",
        "choice4": " Agustin Ramos",
        "answer": 1,
        "description":"Il s'appelle Sergio dit 'Le professeur' avait planifié des cambriolages depuis son plus jeune âge. À l'âge de 19 ans, il a arrêté de renouveler sa carte d'identité, afin de ne pas être enregistré."
    },

    {   
        
        "question": "Condor: Adapté sur les bases d'un roman et d'un film, quel lien relie la série au film Les Trois Jours du Condor (1975) ?",
        "choice1": "Robert  Redford joue dans la serie",
        "choice2": "L'un des métiers pharmaceutiques que Turner signale au cours de son analyse concerne une société appelée Roizman. Owen Roizman était le directeur de la photographie sur le film de 1975. ",
        "choice3": "la serie comme le film se déroule uniquement à Washington des Etats-unis.",
        "choice4": "William Hurt dit' Bob Partridge' avait un petit rôle dans le film.",
        "answer": 2,
        "description":"la bonne réponse est le deuxième choix."
    },

    {   
        
        "question": " Atlanta : Également connu sous le nom de Childish Gambino, quel acteur a joué Earn Marks ?",
        "choice1": "Harrison Barnes",
        "choice2": "Robert Ludlum",
        "choice3": " Donald Glover",
        "choice4": " George Heite",
        "answer": 3,
        "description":"Donald glover est la bonne réponse: Elle traite de la vie de deux cousins sur la scène rap d'Atlanta."
    },

    {   
       
        "question": "Shades of Blue :  Avec quel co-équipier italo-americain'jennifer lopez' joue-t-elle ?",
        "choice1": "Jason Biggs",
        "choice2": "David Boreanaz",
        "choice3": "Ray Liotta",
        "choice4": "Al Pacino",
        "answer": 3,
        "description":"La bonne réponse est 'Ray liotta':Adi Hasak (créateur) est né de parents juifs russes en Hollande. Il a déménagé aux États-Unis assez longtemps pour terminer ses études, puis a déménagé en Israël. Là, il a servi dans l'armée comme soldat pendant sept ans. Il est diplômé de l'université là-bas et après  l'armée,il est devenu journaliste. Il a déménagé avec sa famille à Los Angeles où il s'est découvert une passion pour l'écriture de scénario TV. ",
    },

    {   
        
        "question": "Hawaï 5-0:  Qu'est-ce que « Hawaï 5-0 » ? ",
        "choice1": "Une unité de police spéciale de l'État d'Hawaï",
        "choice2": "Numéro de badge de Steve McGarrett ",
        "choice3": "Le numéro de téléphone d'urgence de la police ",
        "choice4": "L'autoroute principale autour d'Honolulu ",
        "answer": 1,
        "description":"la bonne réponse est:Une unité de police spéciale."
    },

    {   
        
        "question": "house of Cards :  La série commence par un grand bruit qui réveille le personnage principal, Frank Underwood. Quel était ce son ??",
        "choice1": "Des voyous cassent sa vitre.",
        "choice2": "Un chien heurté par une voiture.",
        "choice3": "Un arbre tombe sur sa maison après avoir été frappé par la foudre.",
        "choice4": "Un haut-parleur lui ordonnant de sortir ",
        "answer": 2,
        "description":"Au début, tout ce que nous entendons vraiment, c'est une voiture qui claque ses freins et heurte quelque chose. Après que Frank soit sorti, nous pouvons entendre le chien ressentir une douleur évidente et le conducteur s'enfuir. Réalisant que le chien n'allait pas survivre, Frank fait ce qu'il croit nécessaire. ",
    },

    {   
        
        "question": "Justified : Le maréchal Raylan Givens a dû tirer sur plusieurs personnes au cours de la saison 3. Lequel d'entre eux n'a-t-il PAS tiré ?",
        "choice1": "Fletcher Nix",
        "choice2": "Gary Hawkins",
        "choice3": "Layla",
        "choice4": "Dickie Bennett ",
        "answer": 2,
        "description":"La bonne réponse était Gary Hawkins Raylan a tiré sur Fletcher 'The Ice Pick' Nix dans 'The Gunfighter', alors que Fletcher était sur le point de tuer Raylan et Winona. Layla et son partenaire Lance étaient des voleurs d'organes. Dans 'Thick as Mud', Lance a drogué Raylan et l'a placé dans une baignoire pour prélever ses organes. Layla a tiré sur Lance et Lance est tombé sur Raylan. Avant qu elle ne puisse tirer sur Raylan, il lui a tiré dessus, à travers le corps de Lance. Pris par effraction dans la maison de Loretta à la recherche de l'argent de sa mère, Dickie a tenté de tirer sur Raylan pour éviter d'être arrêté dans la 'Coalition'. Raylan était plus rapide et a tiré sur Dickie. Gary Hawkins a été abattu par Robert Quarles dans une tentative de piéger Raylan pour le meurtre dans « Watching the Detectives ."
    },

    {   
        
        "question": "Westworld :  Qui Maeve trouve-t-elle au QG de Delos et décide-t-elle d'utiliser pour localiser sa fille ?",
        "choice1": "Theresa",
        "choice2": "Clementine",
        "choice3": " Lee",
        "choice4": " William",
        "answer": 3,
        "description":"la bonne réponse était Lee.Au QG de Delos, les couloirs sont remplis de cadavres. Le directeur narratif, Lee Sizemore, est presque tué par un hôte cannibale avant que Maeve n'arrive et ne gèle les fonctions motrices de l'hôte. ",
    },

    {   
        
        "question": "Stranger things :  Mike, Will, Lucas et Dustin jouent tous à quel jeu ensemble ??",
        "choice1": "Donjons et Dragons",
        "choice2": "Super Mario Bros.",
        "choice3": "Football",
        "choice4": "Pokemon Go",
        "answer": 1,
        "description":"La bonne réponse était Donjons et Dragons.Quelque chose s'échappe d'une zone confinée sous le Laboratoire national à l'extérieur de Hawkins, dans l'Indiana, et, après avoir traversé les couloirs sombres et labyrinthiques, un scientifique est tué en attendant de prendre l'ascenseur. Tout ce qui était enfermé là-bas est sorti.Dans la ville voisine, quatre garçons - Mike, Will, Lucas et Dustin - jouent leur dixième heure de leur campagne 'Donjons et Dragons' ",
    },

    {   
        
        "question": " Supergirl : Qui a piraté les ordinateurs DEO ? ?",
        "choice1": "Winn",
        "choice2": "Lucy",
        "choice3": "James",
        "choice4": "Cat",
        "answer": 1,
        "description":"La bonne réponse était Winn.Winn était le génie informatique de CatCo et a également travaillé avec Supergirl pour l'aider à trouver des crimes à arrêter.Il a piraté le DEO pour rechercher des informations sur Jeremiah Danvers, décédé alors qu'il travaillait pour eux des années plus tôt. ",
    },

    {   
        
        "question": "The Walking dead :  Comment Carl appelle-t-il sa petite sœur ??",
        "choice1": "Sophia",
        "choice2": "Lydia",
        "choice3": "judith",
        "choice4": "Grace",
        "answer": 3,
        "description":"La bonne réponse était Judith.Carl passe en revue une litanie de noms possibles - toutes les femmes que le groupe a perdues - mais choisit le nom d'un professeur d'école préféré du monde pré-apocalyptique. Le camp s'occupe ensuite du bébé, Daryl trouvant du lait maternisé et étant le premier à nourrir le nourrisson. ",
    },

    {   
        
        "question": "Gang of London : De quelle nationalité sont les wallace ?",
        "choice1": "Anglaise",
        "choice2": "Galloise",
        "choice3": "Irlandaise",
        "choice4": "Ecossaise",
        "answer": 3,
        "description":"la bonne réponse est :irlandaise.Gangs of London a été diffusée sur Sky Atlantic Outre Manche et va être diffusée à partir du 15 Novembre 2020 en France sur StarzPlay.  La série raconte l’histoire de Finn Wallace, le chef le plus puissant du crime organisé depuis 20 ans, faisant transiter des milliards de livres chaque année. Lorsqu’il est assassiné, son fils Sean Wallace est tout désigné pour prendre la relève",
    },

    {
        "question":"Teen wolf : Qui est le bienfaiteur (saison 4) ?",
        "choice1": "Jordan parrish",
        "choice2": "kira",
        "choice3": "méridith",
        "choice4": "mélissa Mcall",
        "answer": 3,
        "description":"la bonne réponse est la 3eme proposition: C'est une Banshee internée à l'asile d'Eichen House. Elle a été interprétée par Maya Eshet.",
    },
]



const CORRECT_BONUS = 4;
//je gagne 4 pt par bonne réponse.;
const MAX_QUESTIONS = 25;
//j'étalblis une variable de 25 questions.;
startGame = () => { 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    
};



getNewQuestion = () =>{
    if ( availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //je mets une condition que si j'ai effectué l'ensemble des questions ,je me dirigerai vers end.html
         localStorage.setItem('mostRecentScore', score);
         //j'enregistre mes score de ma end page html;
        
        return window.location.assign("end.html");
        //A la fin de mon questionnaire aléatoire je me dirige ves une autre page html.;
    }
    
    
    questionCounter++;
    progressText.innerText =`Question ${questionCounter}/${MAX_QUESTIONS}`;
    //j' écrit sur mon html,la question qui augmente de 1 et je récupère le nombre Max de mes questions;
    console.log((questionCounter / MAX_QUESTIONS)*100);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) *100}%`;
    //je modifie ma progress bar dans le style Css et sa taille en prenant les 2 valeurs des input je le multiplie par cent car c'est 1/25 =0,04 qui correspond à width de 4%.;
   
   //le math floor permet de calculer des entiers
    const questionIndex = Math.floor(Math.random()* availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    //je reprend l'id de ma question <h2>
    showdescription = () =>{

        if (typeof questions[questionIndex].description !=='undefined'){
    
            answer.classList.add ("show");
            answer.innerHTML = questions[questionIndex].description;
        }
    };
    
     hideDescription =() =>{
        answer.classList.remove("show");
        answer.innerHTML = "";
    };


    //il nous faut également des choix qui correspondent aux questions(les 4 choix et la question en rapport )
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number];
        


    });
    


    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true ;
    //je passe à la question suivante si ma réponse est valide et je la  supprime afin de ne plus la revoir. 

    };
     
    

           
  
checkboxes.forEach(checkbox =>{
        checkbox.addEventListener('click',e =>{
        if (!acceptingAnswers) return ;

        acceptingAnswers = true;
        const selectedcheckbox = e.target;
        const selectedAnswer = selectedcheckbox.dataset ['filter'];
        
        const classToApply =
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            // je verifie si la réponse est bonne pour la surlignée en rouge ou vert.;
            
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

            

            selectedcheckbox.parentElement.classList.add(classToApply);
              //pour que l'ensemble de la réponse soit verte ou rouge ,je prends l'input et j'ajoute class
            setTimeout(() => {
                selectedcheckbox.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 2500);
            //je verifie la valeur de mes input,puis après avoir répondu je passe à la question suivante,avec un temps de 3 seconde entre les questions.;
        
        });
    })

    incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
    };
//j'augmente le score à chaque bonne réponse.,

startGame ();
//je traverse mes 25 questions de mon array et j'appelle ma fonction;

showdescription();
hideDescription();