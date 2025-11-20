import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin } from 'lucide-react';

const names = [
  'Aaliyah', 'Aarav', 'Abebe', 'Abigail', 'Ada', 'Adah', 'Adam', 'Adanna', 'Adebayo', 'Adela', 'Adelina', 'Adeola', 'Aditi', 'Adrien', 'Adwoa', 'Aemilia', 'Afia', 'Afonso', 'Agatha', 'Agnes', 'Ahmad', 'Ahmed', 'Aiko', 'Aila', 'Aimee', 'Aisha', 'Akari', 'Akeem', 'Akiko', 'Akira', 'Akosua', 'Akua', 'Alaina', 'Alan', 'Alana', 'Albert', 'Alejandro', 'Aleksei', 'Alessandro', 'Alessia', 'Alex', 'Alexa', 'Alexander', 'Alexandra', 'Alexei', 'Alexis', 'Alfonso', 'Ali', 'Alice', 'Alicia', 'Alina', 'Alisha', 'Alison', 'Aliya', 'Allan', 'Alma', 'Alonso', 'Althea', 'Alva', 'Alvaro', 'Alvin', 'Alyssa', 'Amadi', 'Amal', 'Amalia', 'Amani', 'Amanda', 'Amara', 'Amari', 'Amaya', 'Amber', 'Amelia', 'Ami', 'Amina', 'Amir', 'Amira', 'Amit', 'Amos', 'Amy', 'Ana', 'Ananya', 'Anastasia', 'Andrea', 'Andrei', 'Andrew', 'Andrey', 'Andy', 'Anele', 'Anesu', 'Angel', 'Angela', 'Angelica', 'Angelina', 'Angelo', 'Anh', 'Anika', 'Anita', 'Anja', 'Ankit', 'Ann', 'Anna', 'Annabelle', 'Anne', 'Annette', 'Annie', 'Annika', 'Anthony', 'Antoine', 'Antoinette', 'Anton', 'Antonia', 'Antonio', 'Anya', 'Aoife', 'Aoi', 'Arabella', 'Araceli', 'Ari', 'Ariana', 'Ariel', 'Arjun', 'Arlene', 'Armando', 'Arnav', 'Arnold', 'Aron', 'Arthur', 'Artur', 'Arun', 'Arya', 'Asa', 'Asaph', 'Asher', 'Ashley', 'Ashlyn', 'Ashton', 'Astrid', 'Asuka', 'Atsuko', 'Aubrey', 'Audrey', 'August', 'Augustus', 'Aurora', 'Austin', 'Ava', 'Avery', 'Avi', 'Ayana', 'Ayanna', 'Ayesha', 'Ayla', 'Aylin', 'Ayumu', 'Aziza', 'Azucena', 'Bailey', 'Bakari', 'Barbara', 'Beatrice', 'Beatriz', 'Beau', 'Becky', 'Bella', 'Ben', 'Benedict', 'Benjamin', 'Bennett', 'Benny', 'Bernard', 'Bernice', 'Bert', 'Bertha', 'Beth', 'Bethany', 'Betty', 'Bianca', 'Bill', 'Billy', 'Blake', 'Blanca', 'Bo', 'Bob', 'Bobby', 'Bonnie', 'Boris', 'Brad', 'Bradley', 'Brady', 'Brandon', 'Brayden', 'Breanna', 'Brenda', 'Brendan', 'Brenna', 'Brent', 'Brett', 'Brian', 'Briana', 'Brianna', 'Bridget', 'Britney', 'Brittany', 'Brock', 'Brooke', 'Brooklyn', 'Bruce', 'Bruno', 'Bryan', 'Bryce', 'Brynn', 'Caleb', 'Calvin', 'Cameron', 'Camila', 'Camille', 'Candace', 'Cara', 'Carina', 'Carl', 'Carla', 'Carlos', 'Carlotta', 'Carmen', 'Carol', 'Carolina', 'Caroline', 'Carolyn', 'Carrie', 'Carter', 'Casey', 'Cassandra', 'Cassidy', 'Catalina', 'Catherine', 'Cathy', 'Cecilia', 'Cedric', 'Celeste', 'Celia', 'Cesar', 'Chad', 'Chandra', 'Chanel', 'Chantal', 'Charity', 'Charlene', 'Charles', 'Charlie', 'Charlotte', 'Chase', 'Cheng', 'Cheryl', 'Chester', 'Chiara', 'Chidi', 'Chieko', 'Chijioke', 'Chimamanda', 'Chinonso', 'Chinwe', 'Chloe', 'Chris', 'Christian', 'Christina', 'Christine', 'Christopher', 'Christy', 'Chukwu', 'Ciara', 'Cindy', 'Claire', 'Clara', 'Clare', 'Clarence', 'Clarissa', 'Clark', 'Claude', 'Claudia', 'Clay', 'Clayton', 'Clementine', 'Clifford', 'Clint', 'Clinton', 'Clive', 'Cody', 'Cole', 'Colin', 'Colleen', 'Colton', 'Connie', 'Connor', 'Conrad', 'Constance', 'Cooper', 'Cora', 'Corey', 'Corina', 'Corinne', 'Cornelius', 'Courtney', 'Craig', 'Cristian', 'Cristina', 'Crystal', 'Curtis', 'Cynthia', 'Cyril', 'Daiki', 'Daisy', 'Dakota', 'Dale', 'Damian', 'Damon', 'Dan', 'Dana', 'Dane', 'Danielle', 'Danny', 'Dante', 'Daphne', 'Daria', 'Dario', 'Darius', 'Darlene', 'Darren', 'Darryl', 'Darwin', 'Dave', 'David', 'Dawn', 'Dean', 'Deanna', 'Debbie', 'Deborah', 'Debra', 'Declan', 'Deepak', 'Deja', 'Deji', 'Dele', 'Delia', 'Delilah', 'Denise', 'Dennis', 'Derek', 'Desiree', 'Destiny', 'Devon', 'Dexter', 'Diana', 'Diane', 'Diego', 'Dimitri', 'Dina', 'Dinah', 'Dion', 'Dionne', 'Divya', 'Dmitri', 'Dolores', 'Dominic', 'Dominique', 'Don', 'Donald', 'Donna', 'Donovan', 'Dora', 'Doreen', 'Doris', 'Dorothy', 'Doug', 'Douglas', 'Drake', 'Drew', 'Duane', 'Duncan', 'Dustin', 'Dwayne', 'Dylan', 'Earl', 'Ebony', 'Eddie', 'Eden', 'Edgar', 'Edith', 'Edmund', 'Eduardo', 'Edward', 'Edwin', 'Efua', 'Eileen', 'Elaine', 'Eleanor', 'Elena', 'Eli', 'Eliana', 'Elias', 'Elijah', 'Elisa', 'Elisabeth', 'Elise', 'Elisha', 'Eliza', 'Elizabeth', 'Ella', 'Ellen', 'Ellie', 'Elliott', 'Ellis', 'Eloise', 'Elsa', 'Elsie', 'Elvis', 'Elwood', 'Elyse', 'Emanuel', 'Ember', 'Emeka', 'Emerson', 'Emilia', 'Emilio', 'Emily', 'Emma', 'Emmanuel', 'Emmett', 'Emmy', 'Enoch', 'Enrique', 'Eric', 'Erica', 'Ericka', 'Erik', 'Erika', 'Erin', 'Ernest', 'Ernesto', 'Esme', 'Esmeralda', 'Esther', 'Ethan', 'Ethel', 'Eugene', 'Eva', 'Evan', 'Evangeline', 'Eve', 'Evelyn', 'Everett', 'Ezekiel', 'Ezra', 'Fabian', 'Faith', 'Fallon', 'Farah', 'Farida', 'Fatima', 'Faye', 'Felipe', 'Felix', 'Felicity', 'Fernando', 'Fiona', 'Florence', 'Floyd', 'Folake', 'Fola', 'Frances', 'Francesca', 'Francis', 'Francisco', 'Franco', 'Frank', 'Franklin', 'Fred', 'Freda', 'Frederick', 'Gabriel', 'Gabriela', 'Gabriella', 'Gabrielle', 'Gail', 'Gareth', 'Garrett', 'Garry', 'Gary', 'Gavin', 'Gene', 'Genesis', 'Geneva', 'Genevieve', 'Geoffrey', 'George', 'Georgia', 'Gerald', 'Geraldine', 'Gerard', 'Gertrude', 'Gia', 'Gideon', 'Gilbert', 'Gillian', 'Gina', 'Ginger', 'Giovanna', 'Giovanni', 'Giselle', 'Gladys', 'Glen', 'Glenda', 'Glenn', 'Gloria', 'Gordon', 'Grace', 'Gracie', 'Grant', 'Grayson', 'Greg', 'Gregory', 'Greta', 'Gretchen', 'Griffin', 'Guadalupe', 'Guillermo', 'Gwen', 'Gwendolyn', 'Hailey', 'Hakim', 'Hana', 'Hanna', 'Hannah', 'Hans', 'Harley', 'Harold', 'Harper', 'Harriet', 'Harrison', 'Harry', 'Harvey', 'Hassan', 'Hattie', 'Hayden', 'Hayley', 'Hazel', 'Heath', 'Heather', 'Hector', 'Heidi', 'Helen', 'Helena', 'Henry', 'Herbert', 'Herman', 'Hideo', 'Hilary', 'Hilda', 'Hillary', 'Hiroko', 'Hiroshi', 'Holly', 'Hope', 'Howard', 'Hudson', 'Hugh', 'Hugo', 'Hunter', 'Ian', 'Ibrahim', 'Ida', 'Idris', 'Ignacio', 'Igor', 'Ike', 'Ilana', 'Imani', 'Imelda', 'Imogen', 'Ina', 'Ines', 'Ingrid', 'Ira', 'Irene', 'Iris', 'Irving', 'Isaac', 'Isabel', 'Isabella', 'Isabelle', 'Isadora', 'Isaiah', 'Isiah', 'Isla', 'Ismael', 'Israel', 'Ivan', 'Ivy', 'Izzy', 'Jack', 'Jackie', 'Jackson', 'Jacob', 'Jacqueline', 'Jade', 'Jaden', 'Jaime', 'Jake', 'Jamal', 'James', 'Jamie', 'Jan', 'Jana', 'Jane', 'Janet', 'Janice', 'Jared', 'Jasmine', 'Jason', 'Jasper', 'Javier', 'Jay', 'Jayden', 'Jayla', 'Jazmin', 'Jean', 'Jeanette', 'Jeanne', 'Jeff', 'Jeffrey', 'Jen', 'Jenna', 'Jennifer', 'Jenny', 'Jeremiah', 'Jeremy', 'Jerome', 'Jerry', 'Jesse', 'Jessica', 'Jessie', 'Jesus', 'Jewel', 'Jill', 'Jillian', 'Jim', 'Jimmy', 'Joan', 'Joanna', 'Joanne', 'Joaquin', 'Jocelyn', 'Jodi', 'Jody', 'Joe', 'Joel', 'Joey', 'Johan', 'Johanna', 'John', 'Johnathan', 'Johnny', 'Jolene', 'Jon', 'Jonah', 'Jonas', 'Jonathan', 'Jordan', 'Jorge', 'Jose', 'Joselyn', 'Joseph', 'Josephine', 'Josh', 'Joshua', 'Josiah', 'Josie', 'Joy', 'Joyce', 'Juan', 'Juana', 'Juanita', 'Judith', 'Judy', 'Julia', 'Julian', 'Juliana', 'Julianna', 'Julie', 'Juliet', 'Julio', 'June', 'Junior', 'Juno', 'Justin', 'Justine', 'Kai', 'Kaitlyn', 'Kala', 'Kaleb', 'Kamala', 'Kamau', 'Kamil', 'Kara', 'Karen', 'Karina', 'Karl', 'Karla', 'Kasey', 'Kasey', 'Kate', 'Katelyn', 'Katherine', 'Kathleen', 'Kathryn', 'Kathy', 'Katie', 'Katrina', 'Katy', 'Kayla', 'Kaylee', 'Kazuki', 'Kazuko', 'Keegan', 'Keiko', 'Keith', 'Kelley', 'Kelly', 'Kelsey', 'Kelvin', 'Ken', 'Kendall', 'Kendra', 'Kenneth', 'Kenny', 'Kent', 'Kenya', 'Kenzo', 'Keri', 'Kerry', 'Kevin', 'Khadija', 'Khalid', 'Kian', 'Kiera', 'Kieran', 'Kim', 'Kimberly', 'King', 'Kira', 'Kirk', 'Kirsten', 'Kit', 'Kiyoshi', 'Knox', 'Kofi', 'Koji', 'Koko', 'Kris', 'Krista', 'Kristen', 'Kristin', 'Kristina', 'Kristine', 'Kwame', 'Kwasi', 'Kyle', 'Kylie', 'Kyoko', 'Lacey', 'Laila', 'Lakshmi', 'Lamar', 'Lance', 'Lana', 'Lane', 'Laney', 'Lara', 'Larry', 'Lars', 'Latasha', 'Latifa', 'Latoya', 'Laura', 'Lauren', 'Laurie', 'Laverne', 'Lawrence', 'Layla', 'Leah', 'Leandra', 'Lee', 'Lena', 'Leo', 'Leon', 'Leona', 'Leonard', 'Leonardo', 'Leonora', 'Leroy', 'Leslie', 'Lester', 'Levi', 'Lewis', 'Liam', 'Liana', 'Libby', 'Lila', 'Lilian', 'Lillian', 'Lily', 'Lina', 'Lincoln', 'Linda', 'Lindsay', 'Lindsey', 'Lionel', 'Lisa', 'Liz', 'Liza', 'Lloyd', 'Logan', 'Lois', 'Lola', 'Lonnie', 'Loren', 'Lorenzo', 'Loretta', 'Lori', 'Lorraine', 'Louis', 'Louisa', 'Louise', 'Luca', 'Lucas', 'Lucia', 'Luciano', 'Lucille', 'Lucinda', 'Lucy', 'Luis', 'Luisa', 'Luke', 'Lulu', 'Luna', 'Luther', 'Lydia', 'Lyle', 'Lyn', 'Lynda', 'Lynette', 'Lynn', 'Mabel', 'Mac', 'Mackenzie', 'Macy', 'Maddox', 'Madeline', 'Madelyn', 'Madison', 'Mae', 'Maeve', 'Maggie', 'Mahmoud', 'Mai', 'Maia', 'Malik', 'Malika', 'Mallory', 'Malone', 'Mamadou', 'Mandy', 'Manuel', 'Mara', 'Marc', 'Marcel', 'Marcella', 'Marcelo', 'Marcia', 'Marco', 'Marcos', 'Marcus', 'Margaret', 'Margarita', 'Marge', 'Margot', 'Maria', 'Mariah', 'Mariam', 'Marian', 'Marianne', 'Marie', 'Marilyn', 'Marina', 'Mario', 'Marion', 'Marisa', 'Marissa', 'Marjorie', 'Mark', 'Marla', 'Marlene', 'Marley', 'Marlon', 'Marsha', 'Marshall', 'Martha', 'Martin', 'Martina', 'Marvin', 'Mary', 'Maryam', 'Mason', 'Mateo', 'Mathew', 'Matilda', 'Matt', 'Matthew', 'Mattie', 'Maude', 'Maureen', 'Maurice', 'Mavis', 'Max', 'Maxine', 'Maxwell', 'May', 'Maya', 'Mayumi', 'McKenzie', 'Megan', 'Mei', 'Melanie', 'Melinda', 'Melissa', 'Melody', 'Melvin', 'Mercedes', 'Meredith', 'Merle', 'Meryl', 'Mia', 'Micah', 'Michael', 'Michaela', 'Michele', 'Michelle', 'Mickey', 'Miguel', 'Mikayla', 'Mike', 'Mila', 'Miles', 'Millie', 'Milton', 'Mina', 'Mindy', 'Minerva', 'Minnie', 'Miranda', 'Miriam', 'Misty', 'Mitch', 'Mitchell', 'Miyako', 'Monika', 'Monique', 'Monroe', 'Montez', 'Monty', 'Morgan', 'Morris', 'Moses', 'Moshe', 'Muhammad', 'Musa', 'Mustafa', 'Myra', 'Myrtle', 'Nadia', 'Nadine', 'Naima', 'Nancy', 'Naomi', 'Natalia', 'Natalie', 'Natasha', 'Nathan', 'Nathaniel', 'Neal', 'Ned', 'Neil', 'Nellie', 'Nelson', 'Nena', 'Neville', 'Nicholas', 'Nichole', 'Nick', 'Nicki', 'Nicky', 'Nicolas', 'Nicole', 'Nigel', 'Nika', 'Nikita', 'Nikki', 'Niko', 'Nina', 'Noah', 'Noel', 'Noelle', 'Nolan', 'Nora', 'Norbert', 'Noreen', 'Norma', 'Norman', 'Nuru', 'Nya', 'Obinna', 'Octavia', 'Odessa', 'Olga', 'Oliver', 'Olivia', 'Ollie', 'Omar', 'Opal', 'Ophelia', 'Orion', 'Orlando', 'Oscar', 'Otis', 'Otto', 'Owen', 'Pablo', 'Paige', 'Pam', 'Pamela', 'Paolo', 'Paris', 'Parker', 'Pat', 'Patience', 'Patricia', 'Patrick', 'Patsy', 'Patty', 'Paul', 'Paula', 'Paulette', 'Pauline', 'Pearl', 'Pedro', 'Peggy', 'Penelope', 'Penny', 'Percy', 'Perry', 'Pete', 'Peter', 'Peyton', 'Phil', 'Philip', 'Phillip', 'Phoebe', 'Phyllis', 'Pierce', 'Pierre', 'Piper', 'Polly', 'Porter', 'Precious', 'Preston', 'Prince', 'Priscilla', 'Priya', 'Quinn', 'Quincy', 'Quinton', 'Rachael', 'Rachel', 'Rafael', 'Rahul', 'Raina', 'Raj', 'Ralph', 'Ramon', 'Ramona', 'Randall', 'Randy', 'Raquel', 'Rashad', 'Rasheed', 'Rashida', 'Raul', 'Raven', 'Ray', 'Raymond', 'Reagan', 'Rebecca', 'Rebekah', 'Reed', 'Reese', 'Regina', 'Reginald', 'Reid', 'Reina', 'Remi', 'Rena', 'Renata', 'Rene', 'Renee', 'Rex', 'Rhea', 'Rhoda', 'Rhonda', 'Ricardo', 'Rich', 'Richard', 'Rick', 'Ricky', 'Riley', 'Rita', 'Rob', 'Robbie', 'Robert', 'Roberta', 'Robin', 'Robyn', 'Rocco', 'Rochelle', 'Rocky', 'Rod', 'Roderick', 'Rodney', 'Rodrigo', 'Roger', 'Roland', 'Roman', 'Ron', 'Ronald', 'Ronda', 'Ronnie', 'Rosa', 'Rosalie', 'Rosalind', 'Rosalyn', 'Rose', 'Rosemarie', 'Rosemary', 'Rosie', 'Ross', 'Rowan', 'Roxanne', 'Roy', 'Ruby', 'Rudolf', 'Rudy', 'Rufus', 'Russell', 'Ruth', 'Ryan', 'Rylee', 'Sabrina', 'Sadie', 'Sage', 'Sakura', 'Sally', 'Salvador', 'Sam', 'Samantha', 'Samara', 'Samira', 'Samson', 'Samuel', 'Sandra', 'Sandy', 'Santiago', 'Sara', 'Sarah', 'Sasha', 'Saul', 'Savannah', 'Scarlett', 'Scott', 'Sean', 'Sebastian', 'Selena', 'Selma', 'Serena', 'Sergio', 'Seth', 'Seymour', 'Shane', 'Shannon', 'Shari', 'Sharon', 'Shaun', 'Shawn', 'Shawna', 'Sheila', 'Shelby', 'Sheldon', 'Shelly', 'Sherri', 'Sherry', 'Sheryl', 'Shirley', 'Sidney', 'Sierra', 'Silas', 'Silvia', 'Simon', 'Simone', 'Skylar', 'Sofia', 'Solomon', 'Sonia', 'Sonya', 'Sophia', 'Sophie', 'Spencer', 'Stacey', 'Stacy', 'Stan', 'Stanley', 'Stefan', 'Stella', 'Stephanie', 'Stephen', 'Steve', 'Steven', 'Stewart', 'Stuart', 'Sue', 'Summer', 'Susan', 'Susanna', 'Susie', 'Suzanne', 'Sylvester', 'Sylvia', 'Tabitha', 'Taina', 'Taj', 'Takashi', 'Takeshi', 'Takuya', 'Talia', 'Tamara', 'Tameka', 'Tammy', 'Tanisha', 'Tanya', 'Tara', 'Tariq', 'Tasha', 'Tate', 'Tatiana', 'Taylor', 'Ted', 'Terence', 'Teresa', 'Teri', 'Terrance', 'Terrell', 'Terrence', 'Terri', 'Terry', 'Tessa', 'Thaddeus', 'Thalia', 'Thea', 'Thelma', 'Theo', 'Theodore', 'Theresa', 'Thomas', 'Tiana', 'Tiffany', 'Tim', 'Timothy', 'Tina', 'Titus', 'Tobias', 'Toby', 'Todd', 'Tom', 'Tomás', 'Tomi', 'Tommie', 'Tommy', 'Toni', 'Tony', 'Tonya', 'Tori', 'Tracey', 'Traci', 'Tracy', 'Travis', 'Trevor', 'Trey', 'Tricia', 'Trina', 'Trinity', 'Trisha', 'Tristan', 'Troy', 'Trudy', 'Tucker', 'Ty', 'Tyler', 'Tyrone', 'Tyson', 'Ulises', 'Ulysses', 'Uma', 'Umar', 'Uriel', 'Ursula', 'Valentin', 'Valentina', 'Valerie', 'Vanessa', 'Vaughn', 'Vera', 'Vern', 'Vernon', 'Veronica', 'Vicki', 'Vickie', 'Vicky', 'Victor', 'Victoria', 'Vincent', 'Viola', 'Violet', 'Violeta', 'Virgil', 'Virginia', 'Vivian', 'Wade', 'Wallace', 'Walter', 'Wanda', 'Warren', 'Wayne', 'Wendy', 'Wesley', 'Whitney', 'Wilbur', 'Wilfred', 'Will', 'Willa', 'William', 'Willie', 'Wilma', 'Wilson', 'Winnie', 'Winston', 'Wyatt', 'Xavier', 'Xiomara', 'Yael', 'Yamilet', 'Yara', 'Yasmin', 'Yazmin', 'Yolanda', 'Yossef', 'Yuki', 'Yuko', 'Yuri', 'Yusuf', 'Yvette', 'Yvonne', 'Zach', 'Zachary', 'Zainab', 'Zane', 'Zara', 'Zelda', 'Zeke', 'Zena', 'Zion', 'Zoe', 'Zoey', 'Zora'
];

const actions = [
  'completed a quest', 'joined the waitlist', 'leveled up', 'earned Founder Badge', 
  'completed 5 quests', 'unlocked a new badge', 'reached level 10', 'earned Silver tier',
  'completed daily challenge', 'referred a friend', 'earned Gold tier'
];

const locations = [
  'Seattle, WA', 'Bellevue, WA', 'Tacoma, WA', 'Redmond, WA', 'Kirkland, WA',
  'Renton, WA', 'Spokane, WA', 'Everett, WA', 'Kent, WA', 'Olympia, WA',
  'Portland, OR', 'Vancouver, BC', 'San Francisco, CA', 'Los Angeles, CA', 'New York, NY'
];

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

let namePool = shuffleArray(names);
let nameIndex = 0;

const getNextActivity = () => {
  // Get next name from the pool
  const name = namePool[nameIndex];
  nameIndex++;
  
  // Reshuffle and reset when we've used all names
  if (nameIndex >= namePool.length) {
    namePool = shuffleArray(names);
    nameIndex = 0;
  }
  
  return {
    name,
    action: actions[Math.floor(Math.random() * actions.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    xp: [25, 50, 75, 100, 150][Math.floor(Math.random() * 5)]
  };
};

export default function LiveActivity() {
  const [currentActivity, setCurrentActivity] = useState(getNextActivity());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity(getNextActivity());
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentActivity.name + currentActivity.action}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {currentActivity.name} <span className="text-white/60">{currentActivity.action}</span>
              </p>
              <p className="text-white/50 text-xs flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {currentActivity.location}
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-500/20 rounded-lg">
              <span className="text-amber-400 text-xs font-bold">+{currentActivity.xp} XP</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}