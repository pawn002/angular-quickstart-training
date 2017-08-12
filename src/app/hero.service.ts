import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable() export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    // old getHeroes()
    getHeroes_old(): Promise<Hero[]> {
        console.log('getting data');
        return Promise.resolve(HEROES);
    }
    // new getHeroes()
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(
            resolve => {
                let randoWait = (Math.random() * 1200).toFixed(0);
                console.log('delay of: ', randoWait);
                setTimeout(() => resolve(this.getHeroes()),
                    randoWait
                );
            }
        );
    }
    getHero_old(id: number): Promise<Hero> {
        return this.getHeroesSlowly().then(
            heroes => heroes.find(hero => hero.id === id)
        );
    }
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }
}
