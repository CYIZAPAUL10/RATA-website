const read_more_anchor_node_list = document.querySelectorAll('.read_more_anchor');
const header = document.querySelector('header');
const pages = document.querySelectorAll('.page');
const main = document.querySelector('main'); 

const only_home_nav = header.querySelectorAll('.only_home_nav'); //'About Us' && 'Contact Us' for home navigations
const buttons_page_navigations = header.querySelectorAll('.page_btn'); //only anchor elements that help the page to be dynamic

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
let i,is_nav_menu_active;
is_nav_menu_active = false;

//card read more anchor
read_more_anchor_node_list.forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.target.previousElementSibling.children[0].classList.toggle('none')
    })
})

//page scrolling for sticky position
let scroll = scrollY;
document.addEventListener('scroll', () => {
    if (scroll < scrollY) {
       document.querySelector('.header').classList.add('nav_hidden');
       hamburger.classList.add('upwards');
    }
    else {
        document.querySelector('.header').classList.remove('nav_hidden');
        hamburger.classList.remove('upwards');
    }
    scroll = scrollY;
})

//if navMenu is active
const documentActive = e => {
   navMenu.classList.remove('visible');
   main.classList.remove('blur'); 
}

const documentDesactive = () => {
    document.removeEventListener('mousedown',documentActive);
}

const trying = (e) => {
    navMenu.classList.add('visible');
    main.classList.add('blur');
    document.addEventListener('mousedown',documentActive);
}

hamburger.addEventListener('click',trying);
document.addEventListener('mouseup',documentDesactive);

//if the document is clicked but also an anchor button is targeted
//displaying a page
const page_view = index => {
    for (i = 0; i<pages.length; i++) {
        if (i === index) {
            pages[i].style.display = 'block';
        }
        else {
            pages[i].style.display = 'none';
        }
    }
    //if index === 0, means u're on the home page so the 'About' && 'Contact Us' will display, otherwise 'About' && 'Contact Us' won't display
    //'About' is only_home_nav[0] && 'Contact Us' is only_home_nav[1]
    if (index !== 0) {
        only_home_nav[0].style.display = 'none';
        only_home_nav[1].style.display = 'none';
    }
    else {
        only_home_nav[0].style.display = 'block';
        only_home_nav[1].style.display = 'block';
    }

}

//to navigate the web pages
buttons_page_navigations.forEach ((anchor) => {
    anchor.addEventListener('pointerdown', e => {
        //the e.target corresponds to the 'Home','Our Team','Our Courses'... these are those elements which changes the website state (dynamically)
        //so their id's corresponds to the page's index (substracted by 1) ex Home li item's id === 1 && the Home Page is index 0 in pages array
        page_view(parseInt(e.target.id)-1);
    })
})

page_view(0);
