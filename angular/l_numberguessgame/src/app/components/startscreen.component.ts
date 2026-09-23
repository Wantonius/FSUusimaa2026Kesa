import {Component,OnInit,inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Score} from '../models/score.model';
import {GameMechanics} from '../services/gamemechanics.service';

@Component({
	selector:"start-screen",
	standalone:true,
	imports:[FormsModule,CommonModule],
	templateUrl:"./startscreen.component.html"
})
export class StartScreen implements OnInit {
	
	public name:string = "";
	public topList:Score[] = [];
	private router = inject(Router);
	private game = inject(GameMechanics);
	
	ngOnInit() {
		let temp = localStorage.getItem("toplist");
		if(temp) {
			this.topList = JSON.parse(temp);
		} else {
			this.topList = [];
		}
	}
	
	startGame() {
		if(!this.name) {
			return;
		}
		this.game.startGame(this.name);
		this.name = "";
		this.router.navigate(["/game"]);
	}
}