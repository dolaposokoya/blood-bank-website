// const logout = document.getElementById("logout");
// logout.style.display = "none"

const previousBtn = document.getElementById('previousBtn')
const nextBtn = document.getElementById('nextBtn')
const submitBtn = document.getElementById('submitBtn')
const content = document.getElementById('content')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const bullets = [...document.querySelectorAll('.bullet')];

const maxSteps = 4;
let currentStep = 1;

if(currentStep == 1){
    step1.style.display = 'block'
    step2.style.display = 'none'
    step4.style.display = 'none'
    step3.style.display = 'none'
}

nextBtn.addEventListener('click', () => {
    bullets[currentStep - 1].classList.add('completed')
    currentStep++
   if(currentStep == 2){
        step1.style.display = 'none'
        step2.style.display = 'block'
        step3.style.display = 'none'
    }
    else if(currentStep == 3){
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'
        
    }
    else if(currentStep == 4){
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'block'
    }
    previousBtn.disabled = false
    if(currentStep === maxSteps){
        nextBtn.disabled = true
    }
    content.innerText = `Step Number ${currentStep}`
    console.log(`currentStep is ${currentStep}`)
})

previousBtn.addEventListener('click', () => {
    bullets[currentStep - 2].classList.remove('completed')
    currentStep--
    
    nextBtn.disabled = false
    if(currentStep === 1){
        previousBtn.disabled = true
        step1.style.display = 'block'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'none'
    
    }
    else if(currentStep == 2){
        step1.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'none'
        step2.style.display = 'block'
    }
    else if(currentStep == 3){
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'
    }
    else if(currentStep == 4){
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'block'
    }
    content.innerText = `Step Number ${currentStep}`
    console.log(`currentStep is ${currentStep}`)
})