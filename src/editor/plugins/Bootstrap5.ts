import { Plugin } from "grapesjs";

import * as Group from "./bootstrap/group";
// import * as Container from "./bootstrap/container";
import * as Carousel from "./bootstrap/carousel";
import * as Card from "./bootstrap/card";
import * as Table from "./bootstrap/table";
import * as Heading from "./bootstrap/heading";
import * as Button from "./bootstrap/button";
import * as Dropdown from "./bootstrap/dropdown";
import * as ListGroup from "./bootstrap/listgroup";
import * as Grids from "./bootstrap/grid";
import * as Collapse from "./bootstrap/collapse";
import * as Nav from "./bootstrap/nav";
import * as Navbar from "./bootstrap/navbar";

export interface Bootstrap5Options {
  styles?: string[],
  scripts?: string[]
}
export const Bootstrap5: Plugin<Bootstrap5Options> = (editor, { styles = [], scripts = [] }) => {

  const { DomComponents, BlockManager } = editor;


  DomComponents.addType('link', {
    extend: 'text',
    isComponent: (el) => el.tagName === 'A',
    model: {
      defaults: {
        tagName: 'a',
        draggable: true,
        droppable: true,
        editable: true,
        components: "Link",
        traits: [
          "href",
          {
            type: 'select',
            label: 'Target',
            name: 'target',
            options: [
              { label: 'Self', value: '_self' } as any,
              { label: 'Blank', value: '_blank' },
              { label: 'Parent', value: '_parent' },
              { label: 'Top', value: '_top' }
            ]
          },
          "title", "id", "rel"
        ],
      }
    }
  })
  DomComponents.addType('paragraph', {
    extend: 'text',
    isComponent: (el) => el.tagName === 'P',
    model: {
      defaults: {
        tagName: 'p',
        draggable: true,
        droppable: true,
        editable: true,
        components: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatem",
        traits: [
          "title", "id"
        ],
      }
    }
  });
  BlockManager.add("text", {
    label: "Text",
    category: "Basic",
    content: {
      type: "text",
      components: "Text..."
    }
  });
  BlockManager.add('paragraph', {
    label: 'Paragraph',
    category: 'Basic',
    content: {
      type: 'paragraph',
      components: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatem'
    }
  });
  BlockManager.add("image", {
    label: "Image",
    category: "Basic",
    content: {
      type: "image",
      attributes: {
        class: "d-block w-100"
      }
    }
  })


  // register
  Heading.Register(editor);
  Group.Register(editor);
  ListGroup.Register(editor);
  Grids.Register(editor);
  Nav.Register(editor);
  Dropdown.Register(editor);
  Collapse.Register(editor);
  Navbar.Register(editor);
  Carousel.Register(editor);
  Card.Register(editor);
  Table.Register(editor);
  Button.Register(editor);

  // editor.Components.addType('button', button);
  // editor.Components.addType('container', container(editor));
  // editor.Components.addType('heading', heading(editor));
  // editor.Components.addType('grid-row', Grow);
  // editor.Components.addType('grid-col', Gcol);
  // editor.Components.addType('section', section);
  // editor.Components.addType('article', articel);



  //   /**
  //  * GROUP
  //  */
  //   editor.BlockManager.add('row', {
  //     label: 'Row',
  //     category: 'Group',
  //     media: `<svg width="50px" viewBox="0 0 142.78717 55.11808" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
  //             <g transform="translate(-51.521402,-61.540945)">
  //                 <path
  //                 id="rect234"
  //                 style="fill:#333333;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2.0753;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
  //                 d="m 54.622506,61.540946 c -1.717967,0 -3.101103,1.382621 -3.101103,3.100586 v 48.916908 c 0,1.71797 1.383136,3.10059 3.101103,3.10059 H 191.20745 c 1.71797,0 3.1011,-1.38262 3.1011,-3.10059 V 64.641532 c 0,-1.717965 -1.38313,-3.100586 -3.1011,-3.100586 z m 5.005379,4.31705 h 81.129935 c 1.108,0 1.99987,0.89188 1.99987,1.999878 V 110.3421 c 0,1.108 -0.89187,1.99988 -1.99987,1.99988 H 59.627885 c -1.107998,0 -1.999878,-0.89188 -1.999878,-1.99988 V 67.857874 c 0,-1.107998 0.89188,-1.999878 1.999878,-1.999878 z m 90.889025,0 h 35.32756 c 1.108,0 1.99988,0.891879 1.99988,1.999878 V 110.3421 c 0,1.108 -0.89188,1.99988 -1.99988,1.99988 h -35.32756 c -1.108,0 -1.99988,-0.89188 -1.99988,-1.99988 V 67.857874 c 0,-1.107999 0.89188,-1.999878 1.99988,-1.999878 z" />
  //             </g>
  //         </svg>`,
  //     content: {
  //       type: 'grid-row'
  //     }
  //   });

  //   editor.BlockManager.add('col', {
  //     label: 'Col',
  //     category: 'Group',
  //     media: `<svg width="50px" viewBox="0 0 130.21642 46.483894" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
  //             <g transform="translate(-57.627946,-65.858053)">
  //                 <rect
  //                     style="opacity:1;fill:#333333;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:3.63216;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
  //                     id="rect234-7"
  //                     width="85.129677"
  //                     height="46.483894"
  //                     x="57.627945"
  //                     y="65.858055"
  //                     rx="2" />
  //                 <rect
  //                     style="opacity:1;fill:#333333;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2.46872;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
  //                     id="rect234-7-7"
  //                     width="39.327267"
  //                     height="46.483894"
  //                     x="148.51711"
  //                     y="65.858055"
  //                     rx="2" />
  //             </g>
  //         </svg>`,
  //     content: {
  //       type: 'grid-col'
  //     }
  //   });

  // editor.BlockManager.add('container', {
  //   label: 'Container',
  //   category: 'Group',

  //   content: {
  //     type: 'container',
  //   },
  // });

  // editor.BlockManager.add('section', {
  //   label: 'Section',
  //   category: 'Group',
  //   media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-richtext" viewBox="0 0 16 16">
  //       <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
  //       <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  //       <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
  //     </svg>`,
  //   content: {
  //     type: 'section',
  //     components: [
  //       {
  //         type: 'header',
  //         components: {
  //           type: 'heading',
  //           components: "Lorem ipsum dolor sit amet."
  //         }
  //       },
  //       {
  //         type: 'article',
  //         components: {
  //           type: 'paragraph',
  //           text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, voluptatem."
  //         }
  //       }
  //     ]
  //   },
  // });


  // editor.BlockManager.add('header', {
  //   label: 'Header',
  //   category: 'Group',
  //   media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  //       <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2m2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2 2 0 0 1 1.437-1.437V3.937A2 2 0 0 1 12.063 2.5H3.937A2 2 0 0 1 2.5 3.937M14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  //     </svg>`,
  //   content: `<header>
  //           <h1>Header</h1>
  //       </header>`,
  // });



  //   /**
  //    * BASIC
  //    */
  //   editor.BlockManager.add('button', {
  //     label: 'Button',
  //     category: 'Basic',
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  //         <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  //       </svg>`,
  //     content: {
  //       type: 'button',
  //       attributes: {
  //         class: 'btn btn-primary'
  //       },
  //       components: "Button"
  //     }
  //   });

  //   editor.BlockManager.add('button-group', {
  //     label: 'Button Group',
  //     category: 'Basic',
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  //         <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  //       </svg>`,
  //     content: `<div class="btn-group" role="group" aria-label="Basic example">
  //         <button type="button" class="btn btn-primary">Left</button>
  //         <button type="button" class="btn btn-primary">Middle</button>
  //         <button type="button" class="btn btn-primary">Right</button>
  //       </div>`
  //   });

  //   editor.BlockManager.add('image', {
  //     label: 'Image',
  //     category: 'Basic',
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16">
  //         <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
  //       </svg>`,
  //     content: {
  //       type: 'image',
  //       attributes: {
  //         class: 'img-fluid'
  //       },
  //       components: "Image"
  //     }
  //   });

  //   editor.BlockManager.add("figure", {
  //     label: "Figure",
  //     category: "Basic",
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16">
  //     <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
  //   </svg>`,
  //     content: `<figure class="figure">
  //         <img class="figure-img img-fluid rounded" alt="...">
  //         <figcaption class="figure-caption">A caption for the above image.</figcaption>
  //       </figure>`,

  //   })







  //   editor.BlockManager.add("card", {
  //     label: "Card",
  //     category: "Basic",
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
  //     <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  //     <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
  //   </svg>`,
  //     content: `<div class="card">
  //   <div class="card-header">
  //     Featured
  //   </div>
  //   <div class="card-body">
  //     <h5 class="card-title">Special title treatment</h5>
  //     <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  // </div>`
  //   })



  //   editor.BlockManager.add("heading", {
  //     label: "Heading",
  //     category: "Text",
  //     media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alphabet-uppercase" viewBox="0 0 16 16">
  //         <path d="M1.226 10.88H0l2.056-6.26h1.42l2.047 6.26h-1.29l-.48-1.61H1.707l-.48 1.61ZM2.76 5.818h-.054l-.75 2.532H3.51zm3.217 5.062V4.62h2.56c1.09 0 1.808.582 1.808 1.54 0 .762-.444 1.22-1.05 1.372v.055c.736.074 1.365.587 1.365 1.528 0 1.119-.89 1.766-2.133 1.766zM7.18 5.55v1.675h.8c.812 0 1.171-.308 1.171-.853 0-.51-.328-.822-.898-.822zm0 2.537V9.95h.903c.951 0 1.342-.312 1.342-.909 0-.591-.382-.954-1.095-.954zm5.089-.711v.775c0 1.156.49 1.803 1.347 1.803.705 0 1.163-.454 1.212-1.096H16v.12C15.942 10.173 14.95 11 13.607 11c-1.648 0-2.573-1.073-2.573-2.849v-.78c0-1.775.934-2.871 2.573-2.871 1.347 0 2.34.849 2.393 2.087v.115h-1.172c-.05-.665-.516-1.156-1.212-1.156-.849 0-1.347.67-1.347 1.83"/>
  //       </svg>`,
  //     content: {
  //       type: "heading",
  //       components: "Heading"
  //     }
  //   });

  //   editor.BlockManager.add("paragraph", {
  //     label: "Paragraph",
  //     category: "Text",
  //     content: {
  //       type: "text",
  //       content: "Text"
  //     }
  //   });


  //   editor.BlockManager.add("navbar", {
  //     label: "Navbar",
  //     category: "Basic",
  //     content: `<nav class="navbar navbar-expand-lg bg-body-tertiary">
  //         <div class="container-fluid">
  //           <a class="navbar-brand" href="#">Navbar</a>
  //           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  //             <span class="navbar-toggler-icon"></span>
  //           </button>
  //           <div class="collapse navbar-collapse" id="navbarSupportedContent">
  //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  //               <li class="nav-item">
  //                 <a class="nav-link active" aria-current="page" href="#">Home</a>
  //               </li>
  //               <li class="nav-item">
  //                 <a class="nav-link" href="#">Link</a>
  //               </li>
  //               <li class="nav-item dropdown">
  //                 <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  //                   Dropdown
  //                 </a>
  //                 <ul class="dropdown-menu">
  //                   <li><a class="dropdown-item" href="#">Action</a></li>
  //                   <li><a class="dropdown-item" href="#">Another action</a></li>
  //                   <li><hr class="dropdown-divider"></li>
  //                   <li><a class="dropdown-item" href="#">Something else here</a></li>
  //                 </ul>
  //               </li>
  //               <li class="nav-item">
  //                 <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  //               </li>
  //             </ul>
  //             <form class="d-flex" role="search">
  //               <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
  //               <button class="btn btn-outline-success" type="submit">Search</button>
  //             </form>
  //           </div>
  //         </div>
  //       </nav>`
  //   });
  //   editor.BlockManager.add("carousel", {
  //     label: "Carousel",
  //     category: "Basic",
  //     content: `<div id="carouselExample" class="carousel slide">
  //         <div class="carousel-inner">
  //           <div class="carousel-item active">
  //             <img src="https://picsum.photos/800" class="d-block w-100" alt="...">
  //           </div>
  //           <div class="carousel-item">
  //             <img src="https://picsum.photos/800" class="d-block w-100" alt="...">
  //           </div>
  //           <div class="carousel-item">
  //             <img src="https://picsum.photos/800" class="d-block w-100" alt="...">
  //           </div>
  //         </div>
  //         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
  //           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  //           <span class="visually-hidden">Previous</span>
  //         </button>
  //         <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
  //           <span class="carousel-control-next-icon" aria-hidden="true"></span>
  //           <span class="visually-hidden">Next</span>
  //         </button>
  //       </div>`
  //   })
}