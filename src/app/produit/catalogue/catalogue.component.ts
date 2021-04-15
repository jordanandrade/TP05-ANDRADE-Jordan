import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Store } from '@ngxs/store';
import {AddReference, DelReference} from '../../shared/actions/panier.action';
import {Router} from '@angular/router';
import { PremierServiceService } from '../service/premier.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private premier : PremierServiceService, private store : Store, private router : Router)  { }
  observableBouchon$ : Observable<any> = null;
  observable$ : Observable<any> =null;

  tableauVoiture : Array<any> = [];
  //voitureCher : number = 100000;
  prixVoiture : string="";
  //regEx = /^[0-9]{10}$/;

  ngOnInit(): void {
  //   this.observable$= from(
  //     [{"ref":"fef01","modele":"Ferrari","prix":100000},
  //     {"ref":"ren01","modele":"Twingo","prix":150000},
  //     {"ref":"lamb01","modele":"Lamborghini","prix":50000},
  //     {"ref":"mus01","modele":"Mustang","prix":50000}]
  // );
  }
  //recupere depuis mock
  onClickGetVoiture(){
    console.log ("Liste toute les voitures ...")
    this.observableBouchon$ = this.premier.getVoitures();
  }
  //marche pas en recup de mock / pas de filtre sur le json
  // onClickGetVoitureCher() 
  //   { 
  //     console.log ("Recherche de la voiture la plus cher ...")
  //     if ((this.prixVoiture == "")){
  //       //alert("Rentrer un nombre!")
  //     }
  //     this.observable$.pipe(filter (voiture => voiture.prix > this.prixVoiture )).subscribe (voiture => {this.tableauVoiture.push (voiture)});
  //   }

    addPanier (ref : string) {
      this.store.dispatch (new AddReference ({"reference":ref}));
      console.log (ref);
    }

    delPanier (ref : string) {
      this.store.dispatch (new DelReference ({"reference":ref}));
      console.log (ref);
    }

    viewDetail (voiture : string) {
      this.router.navigate(["/produit/detail", voiture]);
    }
}
