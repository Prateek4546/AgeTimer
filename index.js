
let isDOBOpen = false;
let DateOfBirth;
const settingCogEl = document.getElementById('settingIcon');
const settingContentEl = document.getElementById('settingContent');
const initailTextEl = document.getElementById("initailText");
const afterDoBBtnTextEl = document.getElementById("afterDOBBtnText");
const  DOBBbuttonEl = document.getElementById("dobbutton");
const  DOBInputEl = document.getElementById('dobinput');

const yearEl = document.getElementById('years');
const monthEl = document.getElementById('months');
const dayEl = document.getElementById('days');
const minuteEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
const hourEl = document.getElementById('hour');



const makeTwoDigiteNumber = (number) =>{
    return number > 9 ? number : `0${number}`
}
 
 const localStorag = () =>{
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const day = localStorage.getItem("day");
  if(year && month && day){
    DateOfBirth = new Date(year , month , day);
  }
  upDateAge();
 }

const toggeldateOfBirthSelector = ()=>{

   if(isDOBOpen){
    settingContentEl.classList.add("hide");
   }
   else{
    settingContentEl.classList.remove("hide");
   }
  isDOBOpen = !isDOBOpen;
 
};

const upDateAge = () => {
    const currentAge = new Date();
    const dateDiff = currentAge - DateOfBirth;
    const year = Math.floor(dateDiff/(1000*60*60*24*365));
    const month = Math.floor((dateDiff/(1000*60*60*24*365))%12);
    const day = Math.floor((dateDiff/(1000*60*60*24))% 30);
    const hour = Math.floor(dateDiff/(1000*60*60)%24);
    const minutes = Math.floor(dateDiff/(1000*60)%60);
    const second = Math.floor(dateDiff/(1000)%60);

    yearEl.innerHTML = makeTwoDigiteNumber(year);
    monthEl.innerHTML = makeTwoDigiteNumber(month);
    dayEl.innerHTML = makeTwoDigiteNumber(day);
    hourEl.innerHTML = makeTwoDigiteNumber(hour);
    minuteEl.innerHTML = makeTwoDigiteNumber(minutes);
    secondEl.innerHTML = makeTwoDigiteNumber(second);
    
};

const contentToggler = ()=>{
  upDateAge();
  if(DateOfBirth){
    initailTextEl.classList.add('hide');
    afterDoBBtnTextEl.classList.remove('hide');
    setInterval(() => upDateAge() , 1000);
  }
  else{
    afterDoBBtnTextEl.classList.add('hide');
    initailTextEl.classList.remove('hide');
  }
}

const setDOBHandler = () => {
  const dateString = DOBInputEl.value;
  DateOfBirth = dateString ? new Date(dateString) : null;
  
 
  if(DateOfBirth){
    localStorage.setItem("year" ,DateOfBirth.getFullYear());
    localStorage.setItem("month" , DateOfBirth.getMonth());
    localStorage.setItem("day" , DateOfBirth.getDate());
  }
  setInterval(() => upDateAge() , 1000);
  contentToggler();

};

localStorag();
contentToggler();



settingCogEl.addEventListener('click' , toggeldateOfBirthSelector);
DOBBbuttonEl.addEventListener('click' , setDOBHandler);