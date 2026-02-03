

document.addEventListener('DOMContentLoaded', function () {

    // Get the current script tag's URL
    // const currentScript = document.currentScript.src;
    const baseURL = new URL('.', import.meta.url).href;

    // Now use baseURL for asset paths
    const Root = `${baseURL}../`// adjust as needed

    const CheckIfLocal = `${baseURL}../../VsCode/InDev.txt`

    let Local 

    fetch(CheckIfLocal)
        .then(response => {
            if (response.ok) {
                console.log('💻 Running in local environment');
                Local = true
            } else {
                console.log('🌐 Running in production');
                Local = false
            }
        })
        .catch(err => {
            // Local = false
            // console.error('🌐 Running probanly in production (fetch failed)', err);
        });

    fetch(`${Root}html/navbar.html`)
        .then(response => response.text())
        .then(data => {

            if (data) {


                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Create a fragment to append all children cleanly
                const fragment = document.createDocumentFragment();
                Array.from(doc.body.children).forEach(child => {
                    fragment.appendChild(child);
                });

                // Now inject into body (or wherever you need)
                document.body.appendChild(fragment);
                setTimeout(() => {

                    function cloneNavIntoNavmenu() {
                        // Log to check if header has been updated
                        console.log('Cloning navigation into scroller...');
                      
                        // Find the navigation element in the inserted content
                        const navTemplate = document.getElementById('nav'); // Adjust selector if necessary
                      
                        // Log to check if navTemplate is found
                        console.log('Found navTemplate:', navTemplate);
                      
                        if (navTemplate) {
                          // Clone the navigation content
                          const navClone = document.importNode(navTemplate.content, true);
                      
                          // Find the target elements where the navigation should be cloned
                          const navmenu = document.querySelectorAll('.scroller');
                      
                          // Log to check if navmenu is found
                          console.log('Found scroller elements:', navmenu);
                      
                          if (navmenu.length > 0) {
                            // Append the cloned content to each scroller element
                            Array.from(navmenu).forEach(scroller => {
                              scroller.appendChild(document.importNode(navClone, true));
                            });
                          } else {
                            console.error('No elements with class "scroller" found.');
                          }
                        } else {
                          console.error('Navigation element with ID "nav" not found in the fetched content.');
                        }
                      }

                      cloneNavIntoNavmenu()

                    const BASE_URL_old = "https://unviere.github.io"; // Change this as needed
                    // document.addEventListener("DOMContentLoaded", () => {
                        document.querySelectorAll("a[data-pathOld]").forEach(link => {
                            link.href = BASE_URL_old + link.getAttribute("data-pathOld");
                        });
                    // });

                    const BASE_URL = window.location.origin; // Change this as needed
                    const ReproName = "unviere.github.io"
                    // document.addEventListener("DOMContentLoaded", () => {
                        document.querySelectorAll("a[data-path]").forEach(link => {
                            if (Local){
                                link.href = BASE_URL + "/" + ReproName + link.getAttribute("data-path");
                            } else {
                                link.href = BASE_URL + link.getAttribute("data-path");
                            }
                            
                        });

                    // document.addEventListener("DOMContentLoaded", () => {
                        document.querySelectorAll("a[data-deepLink]").forEach(link => {
                            link.href = `https://ro.blox.com/Ebh5?af_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${link.getAttribute("data-deepLink")}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${link.getAttribute("data-deepLink")}&deep_link_value=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D${link.getAttribute("data-deepLink")}`
                        });
                    // });

                    const SB_info = document.getElementById('container')
                    const SB_Title = document.getElementById('side-menu-title')
                    const SB_desc = document.getElementById('side-menu-desc')

                    SB_Title.textContent = SB_info.getAttribute("data-title")
                    SB_desc.textContent = SB_info.getAttribute("data-desc")


                    

                    const Nav = document.getElementById('NavBar')



                    // console.log(Nav);
                    // const dateLabel = document.getElementById('Date')
                    // const dateLabelnl = document.getElementById('Date-nl')
                    // const d = new Date();

                    //const langToNL = document.getElementById('langToNl')
                    //const langToENG = document.getElementById('langToEng')

                    document.addEventListener('scroll', function () {

                        if (window.scrollY > 70) {
                            Nav.classList.add('scrolling');
                        } else {
                            Nav.classList.remove('scrolling');
                        }

                    })



                    // console.log(`Welkom! Je bekijkt deze pagina op ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.`);
                    // dateLabel.innerHTML = `welcome its: ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.`;
                    // dateLabelnl.innerHTML = `welkom het is: ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}.`;

                    // function changeLanguage(languageCode) {
                    //     Array.from(document.getElementsByClassName('lang')).forEach(function (elem) {
                    //         if (elem.classList.contains('lang-' + languageCode)) {
                    //             elem.style.display = 'block';
                    //         }
                    //         else {
                    //             elem.style.display = 'none';
                    //         }
                    //     });
                    // }

                    // select handler
                    // const selector = document.getElementById('langSelector');
                    // selector.addEventListener('change', function (evt) {
                    //     changeLanguage(this.value);
                    // });

                    // // detect initial browser language
                    // const lang = navigator.userLanguage || navigator.language || 'en-EN';
                    // const startLang = Array.from(selector.options).map(opt => opt.value).find(val => lang.includes(val)) || 'en';
                    // changeLanguage(startLang);

                    // // updating select with start value
                    // selector.selectedIndex = Array.from(selector.options).map(opt => opt.value).indexOf(startLang)

                    // fill "The selected language is:"
                    // document.getElementById('browserLang').innerText = lang;
                    //document.getElementById('startLang').innerText = startLang;

                    const hamburgerButon = document.getElementById('menu-icon')
                    const HamMenu = document.getElementById('side-menu')

                    hamburgerButon.addEventListener('click', () => {

                        if (HamMenu.style.display == "none") {
                            HamMenu.style.display = "flex"
                            hamburgerButon.classList.add('ri-close-line');
                            hamburgerButon.classList.remove('ri-menu-line');
                        } else {
                            HamMenu.style.display = "none"
                            hamburgerButon.classList.remove('ri-close-line');
                            hamburgerButon.classList.add('ri-menu-line');
                        }


                    })
                }, 3000)


            }

        })


})