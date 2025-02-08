const read_more_anchor_node_list = document.querySelectorAll('.read_more_anchor');
const header = document.querySelector('header');
const pages = document.querySelectorAll('.page');
const main = document.querySelector('main');

const all_page_navigations = header.querySelectorAll('li'); //all anchor elements
const buttons_page_navigations = header.querySelectorAll('.page_btn'); //only anchor elements that help the page to be dynamic
const buttons_page_navigations_array = Array.from(buttons_page_navigations); 

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
let i,is_nav_menu_active;
is_nav_menu_active = false;

//card read more anchor
read_more_anchor_node_list.forEach(anchor => {
    anchor.addEventListener('click', e => {
        if (e.target.previousElementSibling.children[0].matches('.none')) {
            e.target.previousElementSibling.children[0].classList.remove('none')
        }
        else {
            e.target.previousElementSibling.children[0].classList.add('none')
        } 
    })
})

//page scrolling for asticky position
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
            pages[i].classList.remove('none');
        }
        else {
            pages[i].classList.add('none');
        }
    }
    if (index !== 0) {
        all_page_navigations[1].classList.add('none');
        all_page_navigations[2].classList.add('none');
    }
    else {
        all_page_navigations[1].classList.remove('none');
        all_page_navigations[2].classList.remove('none');
    }

}

//to navigate the web pages
buttons_page_navigations.forEach ((anchor) => {
    anchor.addEventListener('pointerdown', e => {
        const index = buttons_page_navigations_array.indexOf(e.target);
        page_view(index);
    })
})
