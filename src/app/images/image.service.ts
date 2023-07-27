import { Injectable, computed, signal } from "@angular/core";
import { Image } from "../interface/image.interface";

@Injectable({
    providedIn:'root'
})
export class ImageSrvice{
  searchTerm = signal('');
  images= signal<Image[]>(this.getImagesFromLocalStorage());


       filteredImages = computed(() => {
        const term = this.searchTerm();
        
        if (term === '') {
          return this.images();  
        }
      
        return this.images().filter(image =>
          image.title.toLowerCase().includes(term.toLowerCase()) ||
          image.artist.toLowerCase().includes(term.toLowerCase())
        );
        
      }
     
      );

      private getImagesFromLocalStorage(): Image[] {
        const storedImages = localStorage.getItem('images');
        if(storedImages) {
          return JSON.parse(storedImages);
        }
        return [ {
          title: "Mountain Landscape",
          imageURL: "https://image.shutterstock.com/image-photo/metalli…3d-image-abstract-futuristic-260nw-2288785777.jpg",
          artist: "John Smith",
          price: 100
        },
        {
          title: "Sunset at the Beach",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-neon-abstract-260nw-2258892637.jpg",
          artist: "Jane Doe",
          price: 80
        },
        {
          title: "Flower Garden",
          imageURL: "https://image.shutterstock.com/image-photo/milk-ch…olate-splash-smooth-abstract-260nw-2259581367.jpg",
          artist: "David Johnson",
          price: 120
        },
        {
          title: "City Skylines",
          imageURL: "https://image.shutterstock.com/image-photo/abstract-colorful-3d-shape-cinema-260nw-2248212677.jpg",
          artist: "Emily Williams",
          price: 150
        },
        {
          title: "Abstract Art",
          imageURL: "https://image.shutterstock.com/image-photo/neon-3d-image-summer-water-260nw-2269946013.jpg",
          artist: "Michael Brown",
          price: 200
        },
        {
          title: "Wildlife Photography",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-shapes-floating-fluid-260nw-2281867877.jpg",
          artist: "Sarah Lee",
          price: 90
        },
        {
          title: "Portrait Painting",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-neons-dance-music-260nw-2276372387.jpg",
          artist: "Alex Turner",
          price: 180
        },
        {
          title: "Surreal Artwork",
          imageURL: "https://image.shutterstock.com/image-photo/neon-3d-image-robot-face-260nw-2271841123.jpg",
          artist: "Olivia Green",
          price: 210
        },
        {
          title: "Nature Beauty",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-fishermen-on-neon-260nw-2273121989.jpg",
          artist: "William White",
          price: 110
        },
        {
          title: "Vintage Photography",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-womens-rendering-coming-260nw-2278756297.jpg",
          artist: "Sophia Lee",
          price: 70
        },
        {
          title: "Urban Graffiti",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-shapes-floating-fluid-260nw-2281868593.jpg",
          artist: "Daniel Lee",
          price: 130
        },
        {
          title: "Watercolor Landscape",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-shapes-floating-fluid-260nw-2281792887.jpg",
          artist: "Ella Smith",
          price: 190
        },
        {
          title: "Pop Art",
          imageURL: "https://image.shutterstock.com/image-photo/abstract-colorful-metal-3d-shape-260nw-2278285675.jpg",
          artist: "Lucas Johnson",
          price: 240
        },
        {
          title: "Vintage Posters",
          imageURL: "https://image.shutterstock.com/image-photo/3d-image-abstract-shapes-morphing-260nw-2256633509.jpg",
          artist: "Emma Davis",
          price: 85
        }, 
        ];
      }



      addNewImage(title:string,imageURL:string,artist:string,price:number)
      {
       
        this.images.mutate(values => values.push({title,imageURL,artist,price}));
        this.saveImagesToLocalStorage(this.images());
 
      }

      private saveImagesToLocalStorage(images: Image[]): void {
        localStorage.setItem('images', JSON.stringify(images));
      }
}