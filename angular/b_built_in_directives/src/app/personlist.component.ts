import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
	selector:"person-list",
	standalone:true,
	imports:[CommonModule],
	templateUrl:"./personlist.component.html"
})
export class PersonList {
	
	list = [
	{
		"firstname": "Elaine",
		"lastname": "Torres"
	},
	{
		"firstname": "Veronica",
		"lastname": "Little"
	},
	{
		"firstname": "Conan",
		"lastname": "King"
	},
	{
		"firstname": "Conan",
		"lastname": "Mckay"
	},
	{
		"firstname": "Beverly",
		"lastname": "Nielsen"
	},
	{
		"firstname": "Melanie",
		"lastname": "Thomas"
	},
	{
		"firstname": "Kaitlin",
		"lastname": "Franklin"
	},
	{
		"firstname": "Madonna",
		"lastname": "Dalton"
	},
	{
		"firstname": "Theodore",
		"lastname": "Kramer"
	},
	{
		"firstname": "Nero",
		"lastname": "Hoffman"
	},
	{
		"firstname": "William",
		"lastname": "Porter"
	},
	{
		"firstname": "Florence",
		"lastname": "Sloan"
	},
	{
		"firstname": "Tanya",
		"lastname": "Bartlett"
	},
	{
		"firstname": "Riley",
		"lastname": "Short"
	},
	{
		"firstname": "Cassidy",
		"lastname": "Potts"
	},
	{
		"firstname": "Rudyard",
		"lastname": "Spears"
	},
	{
		"firstname": "Rahim",
		"lastname": "Joseph"
	},
	{
		"firstname": "Ingrid",
		"lastname": "Duffy"
	},
	{
		"firstname": "Abel",
		"lastname": "Ellis"
	},
	{
		"firstname": "Tiger",
		"lastname": "Bruce"
	},
	{
		"firstname": "Roary",
		"lastname": "Griffith"
	},
	{
		"firstname": "Anne",
		"lastname": "Crosby"
	},
	{
		"firstname": "Malik",
		"lastname": "Hays"
	},
	{
		"firstname": "Vincent",
		"lastname": "Gordon"
	},
	{
		"firstname": "Jaden",
		"lastname": "Bright"
	},
	{
		"firstname": "Conan",
		"lastname": "Hayes"
	},
	{
		"firstname": "Isaac",
		"lastname": "Mckee"
	},
	{
		"firstname": "Keely",
		"lastname": "Padilla"
	},
	{
		"firstname": "Vance",
		"lastname": "Wright"
	},
	{
		"firstname": "Lev",
		"lastname": "Barry"
	},
	{
		"firstname": "Simon",
		"lastname": "Lindsey"
	},
	{
		"firstname": "Luke",
		"lastname": "Walters"
	},
	{
		"firstname": "Kessie",
		"lastname": "Gregory"
	},
	{
		"firstname": "Gay",
		"lastname": "Kramer"
	},
	{
		"firstname": "Kathleen",
		"lastname": "Dillon"
	},
	{
		"firstname": "Kristen",
		"lastname": "Cummings"
	},
	{
		"firstname": "Lewis",
		"lastname": "Houston"
	},
	{
		"firstname": "Slade",
		"lastname": "Zimmerman"
	},
	{
		"firstname": "Caryn",
		"lastname": "Barton"
	},
	{
		"firstname": "Jolie",
		"lastname": "Donaldson"
	},
	{
		"firstname": "Axel",
		"lastname": "Dyer"
	},
	{
		"firstname": "Wilma",
		"lastname": "Love"
	},
	{
		"firstname": "Forrest",
		"lastname": "Foster"
	},
	{
		"firstname": "Benjamin",
		"lastname": "Wells"
	},
	{
		"firstname": "Emma",
		"lastname": "Lang"
	},
	{
		"firstname": "Tate",
		"lastname": "Henry"
	},
	{
		"firstname": "Serina",
		"lastname": "Preston"
	},
	{
		"firstname": "Zahir",
		"lastname": "Wise"
	},
	{
		"firstname": "Quinn",
		"lastname": "Merritt"
	},
	{
		"firstname": "Christopher",
		"lastname": "Vega"
	},
	{
		"firstname": "Dara",
		"lastname": "Parrish"
	},
	{
		"firstname": "Shay",
		"lastname": "Goodman"
	},
	{
		"firstname": "Wilma",
		"lastname": "Duncan"
	},
	{
		"firstname": "Xander",
		"lastname": "Adams"
	},
	{
		"firstname": "Brynn",
		"lastname": "Morse"
	},
	{
		"firstname": "Veda",
		"lastname": "Gould"
	},
	{
		"firstname": "Jasper",
		"lastname": "Copeland"
	},
	{
		"firstname": "Norman",
		"lastname": "Park"
	},
	{
		"firstname": "Lillian",
		"lastname": "Ellis"
	},
	{
		"firstname": "Orla",
		"lastname": "Dennis"
	},
	{
		"firstname": "Dara",
		"lastname": "Cotton"
	},
	{
		"firstname": "Susan",
		"lastname": "Garza"
	},
	{
		"firstname": "Portia",
		"lastname": "Barton"
	},
	{
		"firstname": "Kennedy",
		"lastname": "Tanner"
	},
	{
		"firstname": "Jillian",
		"lastname": "Middleton"
	},
	{
		"firstname": "Lars",
		"lastname": "Castaneda"
	},
	{
		"firstname": "Illana",
		"lastname": "Bell"
	},
	{
		"firstname": "Daquan",
		"lastname": "Pena"
	},
	{
		"firstname": "Sara",
		"lastname": "Carson"
	},
	{
		"firstname": "Murphy",
		"lastname": "Tucker"
	},
	{
		"firstname": "Travis",
		"lastname": "Kennedy"
	},
	{
		"firstname": "Theodore",
		"lastname": "Jackson"
	},
	{
		"firstname": "Indira",
		"lastname": "Fischer"
	},
	{
		"firstname": "Dolan",
		"lastname": "Dodson"
	},
	{
		"firstname": "Quentin",
		"lastname": "Holman"
	},
	{
		"firstname": "Molly",
		"lastname": "Sloan"
	},
	{
		"firstname": "Haley",
		"lastname": "Cotton"
	},
	{
		"firstname": "Gisela",
		"lastname": "Doyle"
	},
	{
		"firstname": "Stuart",
		"lastname": "Schultz"
	},
	{
		"firstname": "Abigail",
		"lastname": "Dean"
	},
	{
		"firstname": "Cathleen",
		"lastname": "Herman"
	},
	{
		"firstname": "Quintessa",
		"lastname": "Velasquez"
	},
	{
		"firstname": "Clementine",
		"lastname": "Britt"
	},
	{
		"firstname": "Baxter",
		"lastname": "Walter"
	},
	{
		"firstname": "Kennan",
		"lastname": "Reyes"
	},
	{
		"firstname": "Yoshi",
		"lastname": "Bauer"
	},
	{
		"firstname": "Kennan",
		"lastname": "Perkins"
	},
	{
		"firstname": "Erica",
		"lastname": "Wheeler"
	},
	{
		"firstname": "Beck",
		"lastname": "Mcdowell"
	},
	{
		"firstname": "Akeem",
		"lastname": "Reed"
	},
	{
		"firstname": "Xaviera",
		"lastname": "Glenn"
	},
	{
		"firstname": "Robert",
		"lastname": "Rios"
	},
	{
		"firstname": "Brenden",
		"lastname": "Huffman"
	},
	{
		"firstname": "Natalie",
		"lastname": "Hunt"
	},
	{
		"firstname": "Noah",
		"lastname": "Mcintyre"
	},
	{
		"firstname": "Cade",
		"lastname": "Andrews"
	},
	{
		"firstname": "Tate",
		"lastname": "Barker"
	},
	{
		"firstname": "Akeem",
		"lastname": "Collins"
	},
	{
		"firstname": "Nicholas",
		"lastname": "Cantu"
	},
	{
		"firstname": "Pascale",
		"lastname": "Lott"
	}
]
}