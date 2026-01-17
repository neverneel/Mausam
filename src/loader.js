export default function loaderToggle(value = true) {
    console.log('inside loader toggle')
    const loader=document.getElementById('loader');
    if(!value){
        loader.style.display="none"
    }
    else{
        loader.style.display="block"
    }
}