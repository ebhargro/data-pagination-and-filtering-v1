/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Ebony Hargro 
Aiming for: Exceeds Expectations
*/

const numPages = 9;
const ulList = document.querySelector('.student-list');
const heading = document.querySelector('.header');


/*
Template literal dynamically adding a search bar into the HTML
*/
heading.insertAdjacentHTML('beforeend',
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
 );

/*
Establishing variables for the search box component - one for the input and one for the button
*/

const searchBox = document.querySelector('#search');
const searchButton = document.querySelector('button');

/*
`showPage` function
   * This function will create and insert/append the elements needed to display a "page" of nine students
   * list - object - student data
   * page - number - page number which will determine the 9 students selected from list
   * Conditional will check for instance where an 'empty' list is passed
*/
function showPage(list, page){
   const startIndex = (page*numPages) - numPages;
   const endIndex = page*numPages;
   ulList.innerHTML = '';
   if(list.length > 0){
      for(let i = 0; i < list.length; i++) {
         if(i >= startIndex && i < endIndex){
            ulList.insertAdjacentHTML('beforeend',
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`);
         }
      }
   }else{
      ulList.innerHTML = 'No match found';
   } 
}

/*
`addPagination` function
   * This function will create and insert/append the elements needed for the pagination buttons
   * Functionality of buttons included with a 'click'  handler
   * list - object - student data
*/
function addPagination(list){
   const pageNumber = Math.ceil(list.length/numPages);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   if(list.length != 0){
      for(let i = 1; i < pageNumber+1; i++){
         linkList.insertAdjacentHTML('beforeend',
            `<li>
               <button type="button">${i}</button>
            </li>`);
      }
   
      const first = linkList.firstElementChild.firstElementChild;
      first.className = 'active';
   
      linkList.addEventListener('click', (e) => {
         if(e.target.tagName ==='BUTTON'){
            const activeButtons = document.getElementsByClassName('active');
            for(let i = 0; i < activeButtons.length; i++){
               activeButtons[i].classList.remove('active');
            }
            e.target.className= 'active';
            showPage(list, e.target.textContent);
         }
      });
   }
}

/*
Exceeds expectations: searchNames function
   * returns a modified list of student data based what the user searches for
*/
function searchNames(userInput, list){
   const modifiedList = [];
   for(let i = 0; i < list.length; i++){
      const firstName = list[i].name.first.toLowerCase();
      const lastName = list[i].name.last.toLowerCase();
      const fullName = firstName + lastName;
      if(userInput.value.length != 0){
         if(fullName.includes(userInput.value.toLowerCase())){
            modifiedList.push(list[i]);
         } 
      }else{
         modifiedList.push(list[i]);
      }
   }
   return modifiedList;
}

/*
Event listener to active functions when click or keyup event
*/
searchButton.addEventListener('click', () => {
   const resultList = searchNames(searchBox, data);
   showPage(resultList, 1);
   addPagination(resultList);
});

searchBox.addEventListener('keyup', () => {
   const resultList = searchNames(searchBox, data);
   showPage(resultList, 1);
   addPagination(resultList);
});

/*
Call functions
*/
showPage(data, 1);
addPagination(data);